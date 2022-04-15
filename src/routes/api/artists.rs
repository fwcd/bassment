use actix_web::{get, web, Responder, post};

use crate::{actions::artists, db::DbPool, error::Result};

#[get("")]
async fn get_artists(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artists = artists::all(&conn)?;
    Ok(web::Json(artists))
}

#[post("/{name}")]
async fn post_artist(pool: web::Data<DbPool>, name: web::Path<String>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artist = artists::insert(&name, &conn)?;
    Ok(web::Json(artist))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/artists")
            .service(get_artists)
            .service(post_artist)
    );
}
