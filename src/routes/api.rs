use actix_web::{get, web, Responder};

#[get("/hello")]
async fn hello() -> impl Responder {
    "Hello world!"
}

pub fn api_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .service(hello)
    );
}
