use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Album, NewAlbum, UpdateAlbum, PartialAlbum}, error::Result, db::DbConn};

/// Fetches all albums from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Album>> {
    use crate::schema::albums::dsl::*;
    Ok(albums.get_results(conn)?)
}

/// Looks up an album by id.
pub fn by_id(album_id: i32, conn: &DbConn) -> Result<Option<Album>> {
    use crate::schema::albums::dsl::*;
    Ok(albums.filter(id.eq(album_id)).get_result(conn).optional()?)
}

/// Looks up a partial album for a track id.
pub fn partial_for_track_id(track_id: i32, conn: &DbConn) -> Result<Vec<PartialAlbum>> {
    use crate::schema::{albums, track_albums};
    Ok(albums::table.inner_join(track_albums::table)
        .select((albums::id, albums::name))
        .filter(track_albums::track_id.eq(track_id))
        .get_results(conn)?)
}

/// Inserts an album into the database.
pub fn insert(new_album: &NewAlbum, conn: &DbConn) -> Result<Album> {
    use crate::schema::albums::dsl::*;
    Ok(diesel::insert_into(albums)
        .values(new_album)
        .get_result(conn)?)
}

/// Updates an album in the database.
pub fn update(album_id: i32, update_album: &UpdateAlbum, conn: &DbConn) -> Result<Album> {
    use crate::schema::albums::dsl::*;
    Ok(diesel::update(albums)
        .filter(id.eq(album_id))
        .set(update_album)
        .get_result(conn)?)
}
