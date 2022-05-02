use actix_web::{get, web, Responder, post, patch};

use crate::{actions::files, db::DbPool, error::{Result, Error}, models::{NewFileLocation, UpdateFileLocation}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let files = web::block(move || files::all(&conn)).await??;
    Ok(web::Json(files))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, file: web::Json<NewFileLocation>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let file = web::block(move|| files::insert(&file, &conn)).await??;
    Ok(web::Json(file))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let files = web::block(move || files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))).await??;
    Ok(web::Json(files))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, file: web::Json<UpdateFileLocation>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let file = web::block(move|| files::update(*id, &file, &conn)).await??;
    Ok(web::Json(file))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/files")
            .service(get_all)
            .service(post)
            .service(get_by_id)
            .service(patch_by_id)
    );
}
