use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension, dsl::any};

use crate::{models::{Track, NewTrack, UpdateTrack, AnnotatedTrack}, error::Result, db::DbConn};
use crate::schema::tracks::dsl::*;

use super::{artists, albums, genres};

/// Fetches all tracks from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Track>> {
    Ok(tracks.get_results(conn)?)
}

/// Looks up a track by id.
pub fn by_id(track_id: i32, conn: &DbConn) -> Result<Option<Track>> {
    Ok(tracks.filter(id.eq(track_id)).get_result(conn).optional()?)
}

/// Looks up multiple tracks by id.
pub fn by_ids(track_ids: &[i32], conn: &DbConn) -> Result<Vec<Track>> {
    Ok(tracks.filter(id.eq(any(track_ids))).get_results(conn)?)
}

/// Fetches a track with annotations for the given track.
pub fn annotated_for(track: Track, conn: &DbConn) -> Result<AnnotatedTrack> {
    let track_id = track.id;
    Ok(AnnotatedTrack {
        track,
        artists: artists::partial_for_track_id(track_id, conn)?,
        albums: albums::partial_for_track_id(track_id, conn)?,
        genres: genres::partial_for_track_id(track_id, conn)?,
    })
}

/// Looks up a track with annotations by id.
pub fn annotated_by_id(track_id: i32, conn: &DbConn) -> Result<Option<AnnotatedTrack>> {
    if let Some(track) = by_id(track_id, conn)? {
        Ok(Some(annotated_for(track, conn)?))
    } else {
        Ok(None)
    }
}

/// Looks up multiple tracks with annotations by id.
pub fn annotated_by_ids(track_ids: &[i32], conn: &DbConn) -> Result<Vec<AnnotatedTrack>> {
    by_ids(track_ids, conn)?
        .into_iter()
        .map(|t| annotated_for(t, conn))
        .collect::<Result<Vec<_>>>()
}

/// Fetches all tracks with annotations.
pub fn all_annotated(conn: &DbConn) -> Result<Vec<AnnotatedTrack>> {
    all(conn)?
        .into_iter()
        .map(|t| annotated_for(t, conn))
        .collect::<Result<Vec<_>>>()
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
