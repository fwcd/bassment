use actix_web::{get, web, Responder, post};

use crate::{actions::artists, db::DbPool, error::Result, models::NewArtist};

#[get("")]
async fn get_artists(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artists = artists::all(&conn)?;
    Ok(web::Json(artists))
}

#[post("")]
async fn post_artist(pool: web::Data<DbPool>, artist: web::Json<NewArtist>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artist = artists::insert(&artist, &conn)?;
    Ok(web::Json(artist))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/artists")
            .service(get_artists)
            .service(post_artist)
    );
}
