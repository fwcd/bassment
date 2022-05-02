use std::{fs, path::PathBuf};

use actix_web::{get, web, Responder, post, patch, HttpResponse};

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

async fn path_for(info: &FileInfo, pool: &DbPool) -> Result<PathBuf> {
    let conn = pool.get()?;
    let base_dir = web::block(move || settings::get(&conn)).await??.file_storage_base_directory;
    return Ok(PathBuf::from(format!("{}/{}/{}", base_dir, info.id, info.name)));
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, raw_info: web::Json<UpdateFileInfo>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let sanitized_info = UpdateFileInfo {
        name: raw_info.name.as_ref().map(|n| n.replace("/", "-").replace("..", "")),
        ..raw_info.clone()
    };
    let new_info = web::block(move|| files::update(*id, &sanitized_info, &conn)).await??;
    Ok(web::Json(new_info))
}

// TODO: Range requests, etc?
// TODO: MIME-Type?
// TODO: Deletion endpoints

#[get("/{id}/data")]
async fn get_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let pool_clone = pool.clone();
    // Find info in db
    let info = web::block(move || {
        let conn = pool_clone.get()?;
        files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))
    }).await??;
    let path = path_for(&info, &pool).await?;
    // Read the actual file
    let data = web::block(move || fs::read(path)).await??;
    Ok(HttpResponse::Ok()
        .content_type(info.media_type)
        .body(data))
}

#[patch("/{id}/data")]
async fn put_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, data: web::Bytes) -> Result<impl Responder> {
    let pool_clone = pool.clone();
    // Find info in db
    let info = web::block(move || {
        let conn = pool_clone.get()?;
        files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))
    }).await??;
    // Write the actual file + parent dirs
    let path = path_for(&info, &pool).await?;
    web::block(move || {
        let parent = path.parent().ok_or_else(|| Error::Internal(format!("No parent path")))?;
        fs::create_dir_all(parent)?;
        fs::write(path, &data)?;
        Result::<_>::Ok(())
    }).await??;
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
