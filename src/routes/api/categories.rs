use actix_web::{get, web, Responder, post, patch};

use crate::{actions::categories, db::DbPool, error::{Result, Error}, models::{NewCategory, UpdateCategory}};

#[get("")]
async fn get_all(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let categories = web::block(move || categories::all(&conn)).await??;
    Ok(web::Json(categories))
}

#[get("/trees")]
async fn get_all_trees(pool: web::Data<DbPool>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let categories = web::block(move || categories::all_trees(&conn)).await??;
    Ok(web::Json(categories))
}

#[post("")]
async fn post(pool: web::Data<DbPool>, category: web::Json<NewCategory>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let category = web::block(move|| categories::insert(&category, &conn)).await??;
    Ok(web::Json(category))
}

#[get("/{id}")]
async fn get_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let categories = web::block(move || categories::by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not find category with id {}", id)))).await??;
    Ok(web::Json(categories))
}

#[get("/trees/{id}")]
async fn get_tree_by_id(pool: web::Data<DbPool>, id: web::Path<i32>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let tree = web::block(move || categories::tree_by_id(*id, &conn)?.ok_or_else(|| Error::NotFound(format!("Could not fetch category tree with id {}", id)))).await??;
    Ok(web::Json(tree))
}

#[patch("/{id}")]
async fn patch_by_id(pool: web::Data<DbPool>, id: web::Path<i32>, category: web::Json<UpdateCategory>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let category = web::block(move|| categories::update(*id, &category, &conn)).await??;
    Ok(web::Json(category))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/categories")
            .service(get_all)
            .service(get_all_trees)
            .service(post)
            .service(get_by_id)
            .service(get_tree_by_id)
            .service(patch_by_id)
    );
}
