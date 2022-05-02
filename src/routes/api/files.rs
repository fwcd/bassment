use std::{fs, path::PathBuf, io};

use actix_web::{get, web, Responder, post, patch, put, HttpResponse};

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

fn path_for(info: &FileInfo, pool: &DbPool) -> Result<PathBuf> {
    let conn = pool.get()?;
    let base_dir = settings::get(&conn)?.file_storage_base_directory;
    return Ok(PathBuf::from(format!("{}/{}/{}", base_dir, info.id, info.name)));
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, raw_info: web::Json<UpdateFileInfo>) -> Result<impl Responder> {
    let conn = pool.get()?;
    // Sanitize names
    let sanitized_info = UpdateFileInfo {
        name: raw_info.name.as_ref().map(|n| n.replace("/", "-").replace("..", "")),
        ..raw_info.clone()
    };
    let new_info = web::block(move || {
        // Update info in db
        let old_info = files::by_id(*id, &conn)?;
        let new_info = files::update(*id, &sanitized_info, &conn)?;
        // Move file if needed
        if let Some(old_info) = old_info {
            let old_path = path_for(&old_info, &pool)?;
            let new_path = path_for(&new_info, &pool)?;
            if old_path != new_path && old_path.exists() {
                fs::rename(old_path, new_path)?;
            }
        }
        Result::<_>::Ok(new_info)
    }).await??;
    Ok(web::Json(new_info))
}

// TODO: Range requests, etc?
// TODO: Deletion endpoints

#[get("/{id}/data")]
async fn get_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let pool_clone = pool.clone();
    let (media_type, data) = web::block(move || {
        // Find info in db
        let conn = pool_clone.get()?;
        let info = files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))?;
        // Read the actual file
        let path = path_for(&info, &pool)?;
        let data = fs::read(&path).map_err(|e| match e.kind() {
            io::ErrorKind::NotFound => Error::NotFound(format!("Could not find file at {}", path.display())),
            _ => e.into(),
        })?;
        Result::<_>::Ok((info.media_type, data))
    }).await??;
    Ok(HttpResponse::Ok()
        .content_type(media_type)
        .body(data))
}

#[put("/{id}/data")]
async fn put_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, data: web::Bytes) -> Result<impl Responder> {
    let pool_clone = pool.clone();
    web::block(move || {
        // Find info in db
        let conn = pool_clone.get()?;
        let info = files::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", id)))?;
        // Write the actual file + parent dirs
        let path = path_for(&info, &pool)?;
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
