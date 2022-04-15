use actix_web::{get, web, Responder, post};

use crate::{actions::{insert_artist, fetch_artists}, db::DbPool};

// TODO: Better error handling?

#[get("")]
async fn get_artists(pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("Could not get DB connection");
    let artists = fetch_artists(&conn).expect("Could not query artists");
    web::Json(artists)
}

#[post("/{name}")]
async fn post_artist(pool: web::Data<DbPool>, name: web::Path<String>) -> impl Responder {
    let conn = pool.get().expect("Could not get DB connection");
    let artist = insert_artist(&name, &conn).expect("Could not create artist");
    web::Json(artist)
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/artists")
            .service(get_artists)
            .service(post_artist)
    );
}
