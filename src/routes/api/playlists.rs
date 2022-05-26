use actix_web::{get, web, Responder, post, patch, delete};

use crate::{actions::playlists, db::DbPool, error::{Result, Error}, models::{NewPlaylist, UpdatePlaylist}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let playlists = web::block(move || playlists::all(&conn)).await??;
    Ok(web::Json(playlists))
}

#[get("/trees")]
async fn get_all_trees(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let playlists = web::block(move || playlists::all_trees(&conn)).await??;
    Ok(web::Json(playlists))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, playlist: web::Json<NewPlaylist>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let playlist = web::block(move|| playlists::insert(&playlist, &conn)).await??;
    Ok(web::Json(playlist))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let playlists = web::block(move || playlists::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find playlist with id {}", id)))).await??;
    Ok(web::Json(playlists))
}

#[get("/{id}/tracks/count")]
async fn get_track_count_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let length = web::block(move || playlists::track_count_by_id(*id, &conn)).await??;
    Ok(web::Json(length))
}

#[post("/{id}/tracks/ids")]
async fn post_track_ids(pool: web::Data<DbPool>, id: web::Path<i32>, track_ids: web::Json<Vec<i32>>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let playlist_tracks = web::block(move || playlists::insert_track_ids(*id, &track_ids, &conn)).await??;
    Ok(web::Json(playlist_tracks))
}

#[get("/{id}/tracks/annotated")]
async fn get_annotated_tracks_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tracks = web::block(move || playlists::annotated_tracks_by_id(*id, &conn)).await??;
    Ok(web::Json(tracks))
}

#[get("/trees/{id}")]
async fn get_tree_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tree = web::block(move || playlists::tree_by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not fetch playlist tree with id {}", id)))).await??;
    Ok(web::Json(tree))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, playlist: web::Json<UpdatePlaylist>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let playlist = web::block(move|| playlists::update(*id, &playlist, &conn)).await??;
    Ok(web::Json(playlist))
}

#[delete("/{id}")]
async fn delete_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let count = web::block(move|| playlists::delete(*id, &conn)).await??;
    Ok(web::Json(count))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/playlists")
            .service(get_all)
            .service(get_all_trees)
            .service(post)
            .service(get_by_id)
            .service(get_track_count_by_id)
            .service(post_track_ids)
            .service(get_annotated_tracks_by_id)
            .service(get_tree_by_id)
            .service(patch_by_id)
            .service(delete_by_id)
    );
}
