use actix_web::{web, post, Responder};
use chrono::Duration;

use crate::{db::DbPool, error::Result, models::{Login, Signup, Claims}, actions::auth};

#[post("/login")]
async fn login(pool: web::Data<DbPool>, info: web::Json<Login>) -> Result<impl Responder> {
    // FIXME/DEBUG: Actually check the user before handing out tokens
    let conn = pool.get()?;
    let token = auth::encode(Claims::new(Duration::seconds(120), &info.username), &conn)?;
    Ok(token)
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
