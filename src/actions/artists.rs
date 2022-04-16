use diesel::RunQueryDsl;

use crate::{models::{Artist, NewArtist}, error::Result, db::DbConn};
use crate::schema::artists::dsl::*;

/// Fetches all artists from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Artist>> {
    Ok(artists.get_results(conn)?)
}

/// Inserts an artist into the database.
pub fn insert(new_name: &str, conn: &DbConn) -> Result<Artist> {
    Ok(diesel::insert_into(artists)
        .values(&NewArtist { name: new_name })
        .get_result(conn)?)
}
