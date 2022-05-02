use actix_web::{get, web, Responder, post, patch};

use crate::{actions::genres, db::DbPool, error::{Result, Error}, models::{NewGenre, UpdateGenre}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let genres = web::block(move || genres::all(&conn)).await??;
    Ok(web::Json(genres))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, genre: web::Json<NewGenre>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let genre = web::block(move|| genres::insert(&genre, &conn)).await??;
    Ok(web::Json(genre))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let genres = web::block(move || genres::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find genre with id {}", id)))).await??;
    Ok(web::Json(genres))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, genre: web::Json<UpdateGenre>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let genre = web::block(move|| genres::update(*id, &genre, &conn)).await??;
    Ok(web::Json(genre))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/genres")
            .service(get_all)
            .service(post)
            .service(get_by_id)
            .service(patch_by_id)
    );
}
