use actix_web::{get, web, Responder, post, patch};

use crate::{actions::tracks, db::DbPool, error::{Result, Error}, models::{NewTrack, UpdateTrack}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tracks = web::block(move || tracks::all(&conn)).await??;
    Ok(web::Json(tracks))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, track: web::Json<NewTrack>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let track = web::block(move|| tracks::insert(&track, &conn)).await??;
    Ok(web::Json(track))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tracks = web::block(move || tracks::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find track with id {}", id)))).await??;
    Ok(web::Json(tracks))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, track: web::Json<UpdateTrack>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let track = web::block(move|| tracks::update(*id, &track, &conn)).await??;
    Ok(web::Json(track))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/tracks")
            .service(get_all)
            .service(post)
            .service(get_by_id)
            .service(patch_by_id)
    );
}