use actix_web::{get, web, Responder, post, patch};

use crate::{actions::artists, db::DbPool, error::{Result, Error}, models::{NewArtist, UpdateArtist}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artists = web::block(move || artists::all(&conn)).await??;
    Ok(web::Json(artists))
}

#[get("/partial")]
async fn get_all_partial(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let albums = web::block(move || artists::all_partial(&conn)).await??;
    Ok(web::Json(albums))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, artist: web::Json<NewArtist>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artist = web::block(move|| artists::insert(&artist, &conn)).await??;
    Ok(web::Json(artist))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artists = web::block(move || artists::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find artist with id {}", id)))).await??;
    Ok(web::Json(artists))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, artist: web::Json<UpdateArtist>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let artist = web::block(move|| artists::update(*id, &artist, &conn)).await??;
    Ok(web::Json(artist))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/artists")
            .service(get_all)
            .service(get_all_partial)
            .service(post)
            .service(get_by_id)
            .service(patch_by_id)
    );
}
