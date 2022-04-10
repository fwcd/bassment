#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

mod actions;
mod routes;
mod schema;
mod models;

use std::{io, env};

use actix_web::{HttpServer, App};
use diesel::{PgConnection, Connection};
use diesel_migrations::embed_migrations;
use dotenv::dotenv;

embed_migrations!();

#[actix_web::main]
async fn main() -> io::Result<()> {
    dotenv().ok();

    // Connect to database
    let db_url = env::var("DATABASE_URL").expect("The DATABASE_URL must be set");
    let connection = PgConnection::establish(&db_url).expect(&format!("Error connecting to {}", db_url));

    // Run database migrations
    embedded_migrations::run(&connection).expect("Could not run migrations");

    // Start server
    HttpServer::new(|| {
        App::new()
            .configure(routes::api_config)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
