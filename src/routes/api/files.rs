use actix_web::{get, web::{self, PayloadConfig}, Responder, post, patch, put, HttpResponse};

use crate::{actions::files, db::DbPool, error::{Result, Error}, models::{NewFileInfo, UpdateFileInfo, FileInfo}};

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
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, raw_info: web::Json<UpdateFileInfo>) -> Result<impl Responder> {
    let conn = pool.get()?;
    // Sanitize names
    let sanitized_info = UpdateFileInfo {
        name: raw_info.name.as_ref().map(|n| n.replace("/", "-").replace("..", "")),
        ..raw_info.clone()
    };
    let new_info = web::block(move || files::update_with_file(*id, &sanitized_info, &conn)).await??;
    Ok(web::Json(new_info))
}

// TODO: Range requests, etc?
// TODO: Deletion endpoints

#[get("/{id}/data")]
async fn get_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let (data, media_type) = web::block(move || files::data_by_id(*id, &conn)).await??;
    Ok(HttpResponse::Ok()
        .content_type(media_type)
        .body(data))
}

#[put("/{id}/data")]
async fn put_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, data: web::Bytes) -> Result<impl Responder> {
    let conn = pool.get()?;
    web::block(move || files::update_data_by_id(*id, &data, &conn)).await??;
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
            .service(web::scope("")
                .service(put_data_by_id)
                .app_data(PayloadConfig::new(80_000_000))) // Limit body to 80 MB
    );
}
