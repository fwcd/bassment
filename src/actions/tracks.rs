use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension, dsl::any};

use crate::{models::{Track, NewTrack, UpdateTrack, AnnotatedTrack, PartialFileInfo, TrackAudio}, error::Result, db::DbConn};

use super::{artists, albums, genres};

/// Fetches all tracks from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Track>> {
    use crate::schema::tracks::dsl::*;
    Ok(tracks.get_results(conn)?)
}

/// Looks up a track by id.
pub fn by_id(track_id: i32, conn: &DbConn) -> Result<Option<Track>> {
    use crate::schema::tracks::dsl::*;
    Ok(tracks.filter(id.eq(track_id)).get_result(conn).optional()?)
}

/// Looks up multiple tracks by id.
pub fn by_ids(track_ids: &[i32], conn: &DbConn) -> Result<Vec<Track>> {
    use crate::schema::tracks::dsl::*;
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

/// Looks up associated audio files by track id.
pub fn audios_by_id(track_id: i32, conn: &DbConn) -> Result<Vec<PartialFileInfo>> {
    use crate::schema::{track_audios, file_infos};
    Ok(track_audios::table.inner_join(file_infos::table)
        .filter(track_audios::track_id.eq(track_id))
        .select((file_infos::id, file_infos::name, file_infos::media_type))
        .get_results(conn)?)
}

/// Inserts a new track audio by id.
pub fn insert_audio(track_id: i32, file_id: i32, conn: &DbConn) -> Result<()> {
    use crate::schema::track_audios;
    // TODO: insert_or_ignore_into doesn't seem to satisfy all bounds
    //       (with our Postgres connection), why?
    diesel::insert_into(track_audios::table)
        .values(TrackAudio { track_id, file_id })
        .execute(conn)?;
    Ok(())
}

/// Inserts a track into the database.
pub fn insert(new_track: &NewTrack, conn: &DbConn) -> Result<Track> {
    use crate::schema::tracks::dsl::*;
    Ok(diesel::insert_into(tracks)
        .values(new_track)
        .get_result(conn)?)
}

/// Updates a track in the database.
pub fn update(track_id: i32, update_track: &UpdateTrack, conn: &DbConn) -> Result<Track> {
    use crate::schema::tracks::dsl::*;
    Ok(diesel::update(tracks)
        .filter(id.eq(track_id))
        .set(update_track)
        .get_result(conn)?)
}
