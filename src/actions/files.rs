use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{FileLocation, NewFileLocation, UpdateFileLocation}, error::Result, db::DbConn};
use crate::schema::file_locations::dsl::*;

/// Fetches all file locations from the database.
pub fn all(conn: &DbConn) -> Result<Vec<FileLocation>> {
    Ok(file_locations.get_results(conn)?)
}

/// Looks up an file location by id.
pub fn by_id(location_id: i32, conn: &DbConn) -> Result<Option<FileLocation>> {
    Ok(file_locations.filter(id.eq(location_id)).get_result(conn).optional()?)
}

/// Inserts an file location into the database.
pub fn insert(new_location: &NewFileLocation, conn: &DbConn) -> Result<FileLocation> {
    Ok(diesel::insert_into(file_locations)
        .values(new_location)
        .get_result(conn)?)
}

/// Updates an file location in the database.
pub fn update(location_id: i32, update_location: &UpdateFileLocation, conn: &DbConn) -> Result<FileLocation> {
    Ok(diesel::update(file_locations)
        .filter(id.eq(location_id))
        .set(update_location)
        .get_result(conn)?)
}
