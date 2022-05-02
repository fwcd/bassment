use actix_web::{get, patch, web, Responder};
use actix_web_httpauth::middleware::HttpAuthentication;

use crate::{actions::settings, db::DbPool, error::Result, middleware::auth::authenticate_admin, models::UpdateSettings};

#[get("")]
async fn get(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let settings = web::block(move || settings::get(&conn)).await??;
    Ok(web::Json(settings))
}

#[patch("")]
async fn patch(pool: web::Data<DbPool>, settings: web::Json<UpdateSettings>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let new_settings = web::block(move || settings::update(&settings, &conn)).await??;
    Ok(web::Json(new_settings))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/settings")
            .service(get)
            .service(patch)
            .wrap(HttpAuthentication::bearer(authenticate_admin))
    );
}
