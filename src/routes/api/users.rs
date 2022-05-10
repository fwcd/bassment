use actix_web::{get, web, Responder};

use crate::{actions::users, db::DbPool, error::Result, middleware::auth::Authentication};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let users = web::block(move || users::all(&conn)).await??;
    Ok(web::Json(users))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .service(get_all)
            .wrap(Authentication::admin())
    );
}

