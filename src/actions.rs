use diesel::{PgConnection, RunQueryDsl};

use crate::{models::{Artist, NewArtist}, error::Result};

pub fn fetch_artists(conn: &PgConnection) -> Result<Vec<Artist>> {
    use crate::schema::artists::dsl::*;

    Ok(artists.get_results(conn)?)
}

pub fn insert_artist(new_name: &str, conn: &PgConnection) -> Result<Artist> {
    use crate::schema::artists::dsl::*;

    Ok(diesel::insert_into(artists)
        .values(&NewArtist { name: new_name })
        .get_result(conn)?)
}
