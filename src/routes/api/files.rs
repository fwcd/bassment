use actix_multipart::Multipart;
use actix_web::{get, web::{self, PayloadConfig}, Responder, post, patch, put, HttpResponse};
use futures_util::stream::StreamExt;

use crate::{actions::files, db::DbPool, error::{Result, Error}, models::{NewFileInfo, UpdateFileInfo}, utils::multipart::{read_field_json, read_field_data}, options::Options};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let files = web::block(move || files::all(&conn)).await??;
    Ok(web::Json(files))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, mut multipart: Multipart) -> Result<impl Responder> {
    // Read data field
    let data_field = multipart.next().await.ok_or_else(|| Error::BadRequest("Multipart request needs data field".to_owned()))??;
    let name = data_field.content_disposition().get_filename().ok_or_else(|| Error::BadRequest("No filename attached".to_owned()))?.to_owned();
    let media_type = data_field.content_type().essence_str().to_owned();
    let data = read_field_data(data_field).await?;

    // Insert file info into db and store data on disk
    let conn = pool.get()?;
    let info = NewFileInfo { name, media_type };
    let new_info = web::block(move || files::insert_with_file(info, &data, &conn)).await??;

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
    let new_info = web::block(move || files::update_with_file(*id, info.clone(), &conn)).await??;
    Ok(web::Json(new_info))
}

// TODO: Range requests, etc?
// TODO: Deletion endpoints

#[get("/{id}/data")]
async fn get_data_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let (media_type, data) = web::block(move || files::data_by_id(*id, &conn)).await??;
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

pub fn config(cfg: &mut web::ServiceConfig, opts: &Options) {
    cfg.service(
        web::scope("/files")
            .service(get_all)
            .service(get_by_id)
            .service(patch_by_id)
            .service(get_data_by_id)
            .service(web::scope("")
                .service(post)
                .service(put_data_by_id)
                .app_data(PayloadConfig::new(opts.upload_limit)))
    );
}
