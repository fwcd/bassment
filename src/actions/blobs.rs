use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Blob, NewBlob, UpdateBlob}, error::Result, db::DbConn};
use crate::schema::blobs::dsl::*;

/// Fetches all blobs from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Blob>> {
    Ok(blobs.get_results(conn)?)
}

/// Looks up a blob by id.
pub fn by_id(blob_id: i32, conn: &DbConn) -> Result<Option<Blob>> {
    Ok(blobs.filter(id.eq(blob_id)).get_result(conn).optional()?)
}

/// Inserts a blob into the database.
pub fn insert(new_blob: &NewBlob, conn: &DbConn) -> Result<Blob> {
    Ok(diesel::insert_into(blobs)
        .values(new_blob)
        .get_result(conn)?)
}

/// Updates a blob in the database.
pub fn update(update_blob: &UpdateBlob, conn: &DbConn) -> Result<Blob> {
    Ok(diesel::update(blobs)
        .set(update_blob)
        .get_result(conn)?)
}
