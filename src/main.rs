#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

mod actions;
mod db;
mod routes;
mod schema;
mod models;

use std::{io, env};

use actix_web::{web, HttpServer, App};
use diesel::{PgConnection, r2d2::{ConnectionManager, Pool}};
use diesel_migrations::embed_migrations;
use dotenv::dotenv;

embed_migrations!();

#[actix_web::main]
async fn main() -> io::Result<()> {
    dotenv().ok();

    // Create database pool
    let db_url = env::var("DATABASE_URL").expect("The DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(db_url);
    let pool = Pool::builder()
        .build(manager)
        .expect("Failed to create database pool");

    // Run database migrations
    embedded_migrations::run(&pool.get().unwrap()).expect("Could not run migrations");

    // Start server
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes::api_config)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
