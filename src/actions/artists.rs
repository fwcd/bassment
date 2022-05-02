use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Artist, NewArtist, UpdateArtist}, error::Result, db::DbConn};
use crate::schema::artists::dsl::*;

/// Fetches all artists from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Artist>> {
    Ok(artists.get_results(conn)?)
}

/// Looks up an artist by id.
pub fn by_id(artist_id: i32, conn: &DbConn) -> Result<Option<Artist>> {
    Ok(artists.filter(id.eq(artist_id)).get_result(conn).optional()?)
}

/// Inserts an artist into the database.
pub fn insert(new_artist: &NewArtist, conn: &DbConn) -> Result<Artist> {
    Ok(diesel::insert_into(artists)
        .values(new_artist)
        .get_result(conn)?)
}

/// Updates an artist in the database.
pub fn update(artist_id: i32, update_artist: &UpdateArtist, conn: &DbConn) -> Result<Artist> {
    Ok(diesel::update(artists)
        .filter(id.eq(artist_id))
        .set(update_artist)
        .get_result(conn)?)
}
