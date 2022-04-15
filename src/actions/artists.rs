use diesel::RunQueryDsl;

use crate::{models::{Artist, NewArtist}, error::Result, db::DbConn};

pub fn all(conn: &DbConn) -> Result<Vec<Artist>> {
    use crate::schema::artists::dsl::*;

    Ok(artists.get_results(conn)?)
}

pub fn insert(new_name: &str, conn: &DbConn) -> Result<Artist> {
    use crate::schema::artists::dsl::*;

    Ok(diesel::insert_into(artists)
        .values(&NewArtist { name: new_name })
        .get_result(conn)?)
}
