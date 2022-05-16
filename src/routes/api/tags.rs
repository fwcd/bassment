use actix_web::{get, web, Responder, post, patch};

use crate::{actions::tags, db::DbPool, error::{Result, Error}, models::{NewTag, UpdateTag}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tags = web::block(move || tags::all(&conn)).await??;
    Ok(web::Json(tags))
}

#[get("/partial")]
async fn get_all_partial(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let albums = web::block(move || tags::all_partial(&conn)).await??;
    Ok(web::Json(albums))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, tag: web::Json<NewTag>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tag = web::block(move|| tags::insert(&tag, &conn)).await??;
    Ok(web::Json(tag))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tags = web::block(move || tags::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find tag with id {}", id)))).await??;
    Ok(web::Json(tags))
}

#[get("/{id}/tracks/annotated")]
async fn get_annotated_tracks_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tracks = web::block(move || tags::annotated_tracks_by_id(*id, &conn)).await??;
    Ok(web::Json(tracks))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, tag: web::Json<UpdateTag>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tag = web::block(move|| tags::update(*id, &tag, &conn)).await??;
    Ok(web::Json(tag))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/tags")
            .service(get_all)
            .service(get_all_partial)
            .service(post)
            .service(get_by_id)
            .service(get_annotated_tracks_by_id)
            .service(patch_by_id)
    );
}
