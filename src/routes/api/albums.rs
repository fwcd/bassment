use actix_web::{get, web, Responder, post, patch};

use crate::{actions::albums, db::DbPool, error::{Result, Error}, models::{NewAlbum, UpdateAlbum}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let albums = web::block(move || albums::all(&conn)).await??;
    Ok(web::Json(albums))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, album: web::Json<NewAlbum>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let album = web::block(move|| albums::insert(&album, &conn)).await??;
    Ok(web::Json(album))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let albums = web::block(move || albums::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find album with id {}", id)))).await??;
    Ok(web::Json(albums))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, album: web::Json<UpdateAlbum>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let album = web::block(move|| albums::update(*id, &album, &conn)).await??;
    Ok(web::Json(album))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/albums")
            .service(get_all)
            .service(post)
            .service(get_by_id)
            .service(patch_by_id)
    );
}
