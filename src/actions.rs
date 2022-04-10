use diesel::{PgConnection, RunQueryDsl};

use crate::{db::DbResult, models::{Artist, NewArtist}};

pub fn artists(conn: &PgConnection) -> DbResult<Vec<Artist>> {
    use crate::schema::artist::dsl::*;

    Ok(artist.get_results(conn)?)
}

pub fn insert_artist(new_name: &str, conn: &PgConnection) -> DbResult<Artist> {
    use crate::schema::artist::dsl::*;

    Ok(diesel::insert_into(artist)
        .values(&NewArtist { name: new_name })
        .get_result(conn)?)
}
