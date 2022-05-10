use actix_multipart::Multipart;
use actix_web::{get, web::{self, PayloadConfig}, Responder, post, patch, put, HttpResponse};
use futures_util::stream::StreamExt;

use crate::{actions::tracks, db::DbPool, error::{Result, Error}, models::{NewTrack, UpdateTrack, NewFileInfo}, utils::multipart::read_field_data, constants::UPLOAD_LIMIT_BYTES};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tracks = web::block(move || tracks::all(&conn)).await??;
    Ok(web::Json(tracks))
}

#[get("/annotated")]
async fn get_all_annotated(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tracks = web::block(move || tracks::all_annotated(&conn)).await??;
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
    let track = web::block(move || tracks::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find track with id {}", id)))).await??;
    Ok(web::Json(track))
}

#[get("/{id}/audios")]
async fn get_audios_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let track = web::block(move || tracks::audios_by_id(*id, &conn)).await??;
    Ok(web::Json(track))
}

#[put("/{id}/audios/{file_id}")]
async fn put_audio_by_id(pool: web::Data<DbPool>, ids: web::Path<(i32, i32)>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let (id, file_id) = *ids;
    web::block(move || tracks::insert_audio(id, file_id, &conn)).await??;
    Ok(HttpResponse::Ok())
}

#[get("/annotated/{id}")]
async fn get_annotated_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let track = web::block(move || tracks::annotated_by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find track with id {}", id)))).await??;
    Ok(web::Json(track))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, track: web::Json<UpdateTrack>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let track = web::block(move|| tracks::update(*id, &track, &conn)).await??;
    Ok(web::Json(track))
}

#[post("/autotagged")]
async fn post_autotagged(pool: web::Data<DbPool>, mut multipart: Multipart) -> Result<impl Responder> {
    // Read data field
    let data_field = multipart.next().await.ok_or_else(|| Error::BadRequest("Multipart request needs data field".to_owned()))??;
    let name = data_field.content_disposition().get_filename().ok_or_else(|| Error::BadRequest("No filename attached".to_owned()))?.to_owned();
    let media_type = data_field.content_type().essence_str().to_owned();
    let data = read_field_data(data_field).await?;

    // Insert into db and write to disk
    let conn = pool.get()?;
    let info = NewFileInfo { name, media_type };
    let track = web::block(move|| tracks::insert_autotagged(info, &data, &conn)).await??;

    Ok(web::Json(track))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/tracks")
            .service(get_all)
            .service(get_all_annotated)
            .service(post)
            .service(get_by_id)
            .service(get_audios_by_id)
            .service(put_audio_by_id)
            .service(get_annotated_by_id)
            .service(patch_by_id)
            .service(web::scope("")
                .service(post_autotagged)
                .app_data(PayloadConfig::new(UPLOAD_LIMIT_BYTES)))
    );
}
