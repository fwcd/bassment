use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Genre, NewGenre, UpdateGenre, PartialGenre, AnnotatedTrack}, error::Result, db::DbConn, actions::tracks};
use crate::schema::genres::dsl::*;

/// Fetches all genres from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Genre>> {
    Ok(genres.get_results(conn)?)
}

/// Fetches all genres partially.
pub fn all_partial(conn: &DbConn) -> Result<Vec<PartialGenre>> {
    use crate::schema::genres::dsl::*;
    Ok(genres.select((id, name)).get_results(conn)?)
}

/// Looks up a genre by id.
pub fn by_id(genre_id: i32, conn: &DbConn) -> Result<Option<Genre>> {
    Ok(genres.filter(id.eq(genre_id)).get_result(conn).optional()?)
}

/// Looks up a partial genre for a track id.
pub fn partial_for_track_id(track_id: i32, conn: &DbConn) -> Result<Vec<PartialGenre>> {
    use crate::schema::{genres, track_genres};
    Ok(genres::table.inner_join(track_genres::table)
        .select((genres::id, genres::name))
        .filter(track_genres::track_id.eq(track_id))
        .get_results(conn)?)
}

/// Fetches annotated tracks for a genre by id.
pub fn annotated_tracks_by_id(genre_id: i32, conn: &DbConn) -> Result<Vec<AnnotatedTrack>> {
    use crate::schema::track_genres;
    let track_ids = track_genres::table.select(track_genres::track_id)
        .filter(track_genres::genre_id.eq(genre_id))
        .get_results(conn)?;
    tracks::annotated_by_ids(&track_ids, conn)
}

/// Inserts a genre into the database.
pub fn insert(new_genre: &NewGenre, conn: &DbConn) -> Result<Genre> {
    Ok(diesel::insert_into(genres)
        .values(new_genre)
        .get_result(conn)?)
}

/// Updates a genre in the database.
pub fn update(genre_id: i32, update_genre: &UpdateGenre, conn: &DbConn) -> Result<Genre> {
    Ok(diesel::update(genres)
        .filter(id.eq(genre_id))
        .set(update_genre)
        .get_result(conn)?)
}
