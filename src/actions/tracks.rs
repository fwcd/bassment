use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Track, NewTrack, UpdateTrack}, error::Result, db::DbConn};
use crate::schema::tracks::dsl::*;

/// Fetches all tracks from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Track>> {
    Ok(tracks.get_results(conn)?)
}

/// Looks up a track by id.
pub fn by_id(track_id: i32, conn: &DbConn) -> Result<Option<Track>> {
    Ok(tracks.filter(id.eq(track_id)).get_result(conn).optional()?)
}

/// Inserts a track into the database.
pub fn insert(new_track: &NewTrack, conn: &DbConn) -> Result<Track> {
    Ok(diesel::insert_into(tracks)
        .values(new_track)
        .get_result(conn)?)
}

/// Updates a track in the database.
pub fn update(track_id: i32, update_track: &UpdateTrack, conn: &DbConn) -> Result<Track> {
    Ok(diesel::update(tracks)
        .filter(id.eq(track_id))
        .set(update_track)
        .get_result(conn)?)
}
