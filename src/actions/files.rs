use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{FileInfo, NewFileInfo, UpdateFileInfo}, error::Result, db::DbConn};
use crate::schema::file_infos::dsl::*;

/// Fetches all file infos from the database.
pub fn all(conn: &DbConn) -> Result<Vec<FileInfo>> {
    Ok(file_infos.get_results(conn)?)
}

/// Looks up an file info by id.
pub fn by_id(info_id: i32, conn: &DbConn) -> Result<Option<FileInfo>> {
    Ok(file_infos.filter(id.eq(info_id)).get_result(conn).optional()?)
}

/// Inserts an file info into the database.
pub fn insert(new_info: &NewFileInfo, conn: &DbConn) -> Result<FileInfo> {
    Ok(diesel::insert_into(file_infos)
        .values(new_info)
        .get_result(conn)?)
}

/// Updates an file info in the database.
pub fn update(info_id: i32, update_info: &UpdateFileInfo, conn: &DbConn) -> Result<FileInfo> {
    Ok(diesel::update(file_infos)
        .filter(id.eq(info_id))
        .set(update_info)
        .get_result(conn)?)
}
