use std::fs;

use actix_web::{get, web, Responder, post, patch};

use crate::{actions::{files, settings}, db::DbPool, error::{Result, Error}, models::{NewFileInfo, UpdateFileInfo, FileInfo}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let files = web::block(move || files::all(&conn)).await??;
    Ok(web::Json(files))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, info: web::Json<NewFileInfo>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let new_info = web::block(move || files::insert(&info, &conn)).await??;
    Ok(web::Json(new_info))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let info = web::block(move || files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))).await??;
    Ok(web::Json(info))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, info: web::Json<UpdateFileInfo>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let new_info = web::block(move|| files::update(*id, &info, &conn)).await??;
    Ok(web::Json(new_info))
}

async fn path_for_id(id: i32, pool: &DbPool) -> Result<String> {
    let conn = pool.get()?;
    let base_dir = web::block(move || settings::get(&conn)).await??.file_storage_base_directory;
    return Ok(format!("{}/{}", base_dir, id));
}

// TODO: Range requests, etc?
// TODO: MIME-Type?

#[get("/{id}/data")]
async fn get_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let pool_clone = pool.clone();
    let info = web::block(move || {
        let conn = pool_clone.get()?;
        files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))
    }).await??;
    let path = path_for_id(info.id, &pool).await?;
    let data = web::block(move || fs::read(path)).await??;
    Ok(data)
}

#[patch("/{id}/data")]
async fn put_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, data: web::Bytes) -> Result<impl Responder> {
    let pool_clone = pool.clone();
    let info = web::block(move || {
        let conn = pool_clone.get()?;
        files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))
    }).await??;
    let path = path_for_id(info.id, &pool).await?;
    web::block(move || fs::write(path, &data)).await??;
    Ok("Success!")
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/files")
            .service(get_all)
            .service(post)
            .service(get_by_id)
            .service(patch_by_id)
            .service(get_data_by_id)
            .service(put_data_by_id)
    );
}
