use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Artist, NewArtist, UpdateArtist, PartialArtist}, error::Result, db::DbConn};

/// Fetches all artists from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Artist>> {
    use crate::schema::artists::dsl::*;
    Ok(artists.get_results(conn)?)
}

/// Fetches all artists partially.
pub fn all_partial(conn: &DbConn) -> Result<Vec<PartialArtist>> {
    use crate::schema::artists::dsl::*;
    Ok(artists.select((id, name)).get_results(conn)?)
}

/// Looks up an artist by id.
pub fn by_id(artist_id: i32, conn: &DbConn) -> Result<Option<Artist>> {
    use crate::schema::artists::dsl::*;
    Ok(artists.filter(id.eq(artist_id)).get_result(conn).optional()?)
}

/// Looks up a partial artist for a track id.
pub fn partial_for_track_id(track_id: i32, conn: &DbConn) -> Result<Vec<PartialArtist>> {
    use crate::schema::{artists, track_artists};
    Ok(artists::table.inner_join(track_artists::table)
        .select((artists::id, artists::name))
        .filter(track_artists::track_id.eq(track_id))
        .get_results(conn)?)
}

/// Inserts an artist into the database.
pub fn insert(new_artist: &NewArtist, conn: &DbConn) -> Result<Artist> {
    use crate::schema::artists::dsl::*;
    Ok(diesel::insert_into(artists)
        .values(new_artist)
        .get_result(conn)?)
}

/// Updates an artist in the database.
pub fn update(artist_id: i32, update_artist: &UpdateArtist, conn: &DbConn) -> Result<Artist> {
    use crate::schema::artists::dsl::*;
    Ok(diesel::update(artists)
        .filter(id.eq(artist_id))
        .set(update_artist)
        .get_result(conn)?)
}
