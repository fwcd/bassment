use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Album, NewAlbum, UpdateAlbum}, error::Result, db::DbConn};
use crate::schema::albums::dsl::*;

/// Fetches all albums from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Album>> {
    Ok(albums.get_results(conn)?)
}

/// Looks up an album by id.
pub fn by_id(album_id: i32, conn: &DbConn) -> Result<Option<Album>> {
    Ok(albums.filter(id.eq(album_id)).get_result(conn).optional()?)
}

/// Inserts an album into the database.
pub fn insert(new_album: &NewAlbum, conn: &DbConn) -> Result<Album> {
    Ok(diesel::insert_into(albums)
        .values(new_album)
        .get_result(conn)?)
}

/// Updates an album in the database.
pub fn update(album_id: i32, update_album: &UpdateAlbum, conn: &DbConn) -> Result<Album> {
    Ok(diesel::update(albums)
        .set(update_album)
        .get_result(conn)?)
}
