use actix_web::{get, web, Responder, post};

use crate::{actions::artists, db::DbPool, error::{Result, Error}, models::NewArtist};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artists = artists::all(&conn)?;
    Ok(web::Json(artists))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artists = artists::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find user with id {}", id)))?;
    Ok(web::Json(artists))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, artist: web::Json<NewArtist>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artist = artists::insert(&artist, &conn)?;
    Ok(web::Json(artist))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/artists")
            .service(get_all)
            .service(get_by_id)
            .service(post)
    );
}
