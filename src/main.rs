mod routes;

use std::io;

use actix_web::{HttpServer, App};

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .configure(routes::api_config)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
