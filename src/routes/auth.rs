use actix_web::{web, post, Responder};
use serde::Deserialize;

use crate::{db::DbPool, error::Result};

#[derive(Deserialize)]
struct Login {
    username: String,
    password: String,
}

#[derive(Deserialize)]
struct Signup {
    username: String,
    password: String,
}

#[post("/login")]
async fn login(pool: web::Data<DbPool>, info: web::Json<Login>) -> Result<impl Responder> {
    Ok("Success!")
}

#[post("/signup")]
async fn signup(pool: web::Data<DbPool>, info: web::Json<Signup>) -> Result<impl Responder> {
    Ok("Success!")
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/auth/v1")
            .service(login)
            .service(signup)
    );
}

