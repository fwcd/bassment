#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

mod actions;
mod middleware;
mod db;
mod error;
mod routes;
#[allow(unused_imports)]
mod schema;
mod models;
mod utils;

use std::{io, env, path::PathBuf};

use actix_web::{web, HttpServer, App};
use clap::Parser;
use diesel::{PgConnection, r2d2::{ConnectionManager, Pool}};
use diesel_migrations::embed_migrations;
use dotenv::dotenv;
use tracing::{Level, info};
use tracing_actix_web::TracingLogger;
use tracing_subscriber::fmt::format::FmtSpan;

embed_migrations!();

#[derive(Parser, Debug)]
#[clap(version, about)]
struct Args {
    /// Only serves the API/auth endpoints (without the frontend).
    #[clap(long)]
    api_only: bool,
    /// The path to the built frontend to serve.
    #[clap(long, default_value = "./frontend/dist")]
    frontend_path: String,
    /// A custom database URL to use.
    #[clap(long)]
    database_url: Option<String>,
    /// Regenerates the root user and prints the password.
    #[clap(long)]
    regenerate_root: bool,
    /// The host to run on.
    #[clap(short, long, default_value = "127.0.0.1")]
    host: String,
    /// The port to run on.
    #[clap(short, long, default_value_t = 8090)]
    port: u16,
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    // Parse args
    let args = Args::parse();

    // Load .env
    dotenv().ok();

    // Set up stdout tracing subscriber (structured logging)
    let subscriber = tracing_subscriber::fmt()
        .with_span_events(FmtSpan::NEW)
        .with_max_level(Level::INFO)
        .finish();
    tracing::subscriber::set_global_default(subscriber).expect("Could not set tracing subscriber");

    // Create database pool
    let db_url = args.database_url.or_else(|| env::var("DATABASE_URL").ok()).expect("The DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(db_url);
    let pool = Pool::builder()
        .build(manager)
        .expect("Failed to create database pool");

    // Run database migrations
    embedded_migrations::run(&pool.get().unwrap()).expect("Could not run migrations");

    // Generate root user if not exists
    {
        let conn = pool.get().expect("Could not fetch connection for checking root user");
        if args.regenerate_root || actions::users::root(&conn).is_err() {
            let (password, _) = actions::users::generate_root(&conn).expect("Could not generate root user");
            info!("// ROOT-PASSWORD: {}", password)
        }
    }

    // Start server
    info!("Starting on {}:{}...", args.host, args.port);
    HttpServer::new(move || {
        let frontend_path = Some(args.frontend_path.clone())
            .filter(|_| !args.api_only)
            .map(PathBuf::from);
        App::new()
            .wrap(TracingLogger::default())
            .app_data(web::Data::new(pool.clone()))
            .configure(|c| routes::config(c, frontend_path.as_ref().map(|p| p.as_ref())))
    })
    .bind((args.host, args.port))?
    .run()
    .await
}
