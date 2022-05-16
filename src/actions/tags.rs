use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Tag, NewTag, UpdateTag}, error::Result, db::DbConn};

/// Fetches all tags from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Tag>> {
    use crate::schema::tags::dsl::*;
    let fetched = tags.get_results(conn)?;
    Ok(fetched)
}

/// Looks up a tag by id.
pub fn by_id(tag_id: i32, conn: &DbConn) -> Result<Option<Tag>> {
    use crate::schema::tags::dsl::*;
    Ok(tags.filter(id.eq(tag_id)).get_result(conn).optional()?)
}

/// Inserts a tag into the database.
pub fn insert(new_tag: &NewTag, conn: &DbConn) -> Result<Tag> {
    use crate::schema::tags::dsl::*;
    Ok(diesel::insert_into(tags)
        .values(new_tag)
        .get_result(conn)?)
}

/// Inserts or fetches a tag from the database.
pub fn insert_or_get(new_tag: &NewTag, conn: &DbConn) -> Result<Tag> {
    use crate::schema::tags::dsl::*;
    // Unfortunately, Postgres doesn't return the existing row with
    // on_conflict_do_nothing, so we have to work around this by perform an 'empty' update.
    Ok(diesel::insert_into(tags)
        .values(new_tag)
        .on_conflict((category_id, value))
        .do_update()
        .set(category_id.eq(category_id))
        .get_result(conn)?)
}

/// Updates a tag in the database.
pub fn update(tag_id: i32, update_tag: &UpdateTag, conn: &DbConn) -> Result<Tag> {
    use crate::schema::tags::dsl::*;
    Ok(diesel::update(tags)
        .filter(id.eq(tag_id))
        .set(update_tag)
        .get_result(conn)?)
}
