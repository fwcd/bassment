use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Tag, NewTag, UpdateTag, AnnotatedTrack, AnnotatedTag}, error::Result, db::DbConn, actions::tracks};

/// Fetches all tags from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Tag>> {
    use crate::schema::tags::dsl::*;
    let fetched = tags.get_results(conn)?;
    Ok(fetched)
}

/// Fetches all tags with annotations.
pub fn all_annotated(conn: &DbConn) -> Result<Vec<AnnotatedTag>> {
    use crate::schema::{tags, categories};
    let mut fetched = tags::table.inner_join(categories::table)
        .select((tags::id, categories::key, categories::display_name, tags::value))
        .get_results(conn)?;
    fetched.sort_by_key(|a: &AnnotatedTag| a.display_name.clone());
    Ok(fetched)
}

/// Looks up a tag by id.
pub fn by_id(tag_id: i32, conn: &DbConn) -> Result<Option<Tag>> {
    use crate::schema::tags::dsl::*;
    Ok(tags.filter(id.eq(tag_id)).get_result(conn).optional()?)
}

/// Fetches annotated tracks for a tag by id.
pub fn annotated_tracks_by_id(tag_id: i32, conn: &DbConn) -> Result<Vec<AnnotatedTrack>> {
    use crate::schema::track_tags;
    let track_ids = track_tags::table.select(track_tags::track_id)
        .filter(track_tags::tag_id.eq(tag_id))
        .get_results(conn)?;
    tracks::annotated_by_ids(&track_ids, conn)
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
