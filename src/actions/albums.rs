use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Album, NewAlbum, UpdateAlbum, PartialAlbum, AnnotatedTrack}, error::Result, db::DbConn, actions::tracks};

/// Fetches all albums from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Album>> {
    use crate::schema::albums::dsl::*;
    let mut fetched = albums.get_results(conn)?;
    fetched.sort_by_key(|a: &Album| a.name.clone());
    Ok(fetched)
}

/// Fetches all albums partially.
pub fn all_partial(conn: &DbConn) -> Result<Vec<PartialAlbum>> {
    use crate::schema::albums::dsl::*;
    let mut fetched = albums.select((id, name)).get_results(conn)?;
    fetched.sort_by_key(|a: &PartialAlbum| a.name.clone());
    Ok(fetched)
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

/// Fetches annotated tracks for an album by id.
pub fn annotated_tracks_by_id(album_id: i32, conn: &DbConn) -> Result<Vec<AnnotatedTrack>> {
    use crate::schema::track_albums;
    let track_ids = track_albums::table.select(track_albums::track_id)
        .filter(track_albums::album_id.eq(album_id))
        .get_results(conn)?;
    tracks::annotated_by_ids(&track_ids, conn)
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
