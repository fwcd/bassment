use std::io::Cursor;

use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension, dsl::any};
use id3::{Tag, TagLike};

use crate::{models::{Track, NewTrack, UpdateTrack, AnnotatedTrack, PartialFileInfo, TrackAudio, NewFileInfo, TrackTag, NewTag, NewArtist, TrackAlbum, TrackArtist}, error::Result, db::DbConn};

use super::{tags, files, albums, artists};

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
        tags: tags::annotated_for_ids(&[track_id], conn)?,
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

/// Inserts a new track-audio association by id. Ignores if exists.
pub fn insert_audio(track_id: i32, file_id: i32, conn: &DbConn) -> Result<()> {
    use crate::schema::track_audios;
    diesel::insert_into(track_audios::table)
        .values(TrackAudio { track_id, file_id })
        .on_conflict_do_nothing()
        .execute(conn)?;
    Ok(())
}

/// Inserts a new track-tag association by id. Updates track number if exists.
pub fn insert_tag(track_id: i32, tag_id: i32, track_number: Option<i32>, conn: &DbConn) -> Result<()> {
    use crate::schema::track_tags;
    diesel::insert_into(track_tags::table)
        .values(TrackTag { track_id, tag_id })
        // TODO: Add track_number to track_tags?
        // .on_conflict(track_tags::track_number)
        // .do_update()
        // .set(track_tags::track_number.eq(track_number))
        .execute(conn)?;
    Ok(())
}

/// Inserts a new track-artist association by id. Ignores if exists.
pub fn insert_artist(track_id: i32, artist_id: i32, conn: &DbConn) -> Result<()> {
    use crate::schema::track_artists;
    diesel::insert_into(track_artists::table)
        .values(TrackArtist { track_id, artist_id })
        .on_conflict_do_nothing()
        .execute(conn)?;
    Ok(())
}

/// Inserts a new track-album association by id. Updates track number if exists.
pub fn insert_album(track_id: i32, album_id: i32, track_number: i32, conn: &DbConn) -> Result<()> {
    use crate::schema::track_albums;
    diesel::insert_into(track_albums::table)
        .values(TrackAlbum { track_id, album_id, track_number })
        .on_conflict(track_albums::track_number)
        .do_update()
        .set(track_albums::track_number.eq(track_number))
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

/// Inserts a track, audio and a file, automatically tagged with the ID3 data from the file.
pub fn insert_autotagged(info: NewFileInfo, data: &[u8], conn: &DbConn) -> Result<()> {
    // Parse tags from binary data
    // TODO: Support tags other than ID3
    let cursor = Cursor::new(data);
    let metadata_tag = Tag::read_from(cursor)?;

    // Insert file info into db and write to disk
    let file_name = info.name.clone();
    let file_info = files::insert_with_file(info, data, conn)?;

    // Insert track and audio association into db
    let new_track = NewTrack::titled(metadata_tag.title().unwrap_or_else(|| &file_name));
    let track = insert(&new_track, conn)?;
    insert_audio(track.id, file_info.id, conn)?;

    // Insert artist into db if a tag exists
    // TODO: Split artists by comma or using some other heuristic?
    if let Some(artist_name) = metadata_tag.artist() {
        let artist = artists::insert_or_get(&NewArtist::named(artist_name), conn)?;
        insert_artist(track.id, artist.id, conn)?;
    }

    // Insert genre into db if a tag exists
    // TODO: Can a tag have multiple genres? Perhaps split by comma?
    if let Some(genre_name) = metadata_tag.genre() {
        let genre = tags::insert_or_get(&NewTag::genre(genre_name), conn)?;
        insert_tag(track.id, genre.id, None, conn)?;
    }

    // TODO: Insert bpm etc.
    // TODO: Insert cover art into db

    // TODO: Insert (or ignore) album into db
    //       This might be a bit trickier since albums don't have a unique
    //       name constraint (since they aren't unique, at least not
    //       across different artists)

    Ok(())
}
