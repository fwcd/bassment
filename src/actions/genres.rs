use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Genre, NewGenre, UpdateGenre}, error::Result, db::DbConn};
use crate::schema::genres::dsl::*;

/// Fetches all genres from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Genre>> {
    Ok(genres.get_results(conn)?)
}

/// Looks up a genre by id.
pub fn by_id(genre_id: i32, conn: &DbConn) -> Result<Option<Genre>> {
    Ok(genres.filter(id.eq(genre_id)).get_result(conn).optional()?)
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
