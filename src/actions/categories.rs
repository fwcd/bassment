use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Category, NewCategory, UpdateCategory, CategoryTreeNode}, error::Result, db::DbConn};

/// Fetches all categories from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Category>> {
    use crate::schema::categories::dsl::*;
    let mut fetched = categories.get_results(conn)?;
    fetched.sort_by_key(|a: &Category| a.display_name.clone());
    Ok(fetched)
}

/// Fetches a category tree for a category.
fn tree_for(category: Category, conn: &DbConn) -> Result<CategoryTreeNode> {
    use crate::schema::tags;
    let id = category.id;
    Ok(CategoryTreeNode {
        category,
        children: Vec::new(),
        tags: tags::table
            .filter(tags::category_id.eq(id))
            .get_results(conn)?
    })
}

/// Fetches a category tree by id.
pub fn tree_by_id(playlist_id: i32, conn: &DbConn) -> Result<Option<CategoryTreeNode>> {
    if let Some(playlist) = by_id(playlist_id, conn)? {
        Ok(Some(tree_for(playlist, conn)?))
    } else {
        Ok(None)
    }
}

/// Fetches all category trees from the database.
pub fn all_trees(conn: &DbConn) -> Result<Vec<CategoryTreeNode>> {
    all(conn)?
        .into_iter()
        .map(|c| tree_for(c, conn))
        .collect::<Result<Vec<_>>>()
}

/// Looks up a category by id.
pub fn by_id(category_id: i32, conn: &DbConn) -> Result<Option<Category>> {
    use crate::schema::categories::dsl::*;
    Ok(categories.filter(id.eq(category_id)).get_result(conn).optional()?)
}

/// Inserts a category into the database.
pub fn insert(new_category: &NewCategory, conn: &DbConn) -> Result<Category> {
    use crate::schema::categories::dsl::*;
    Ok(diesel::insert_into(categories)
        .values(new_category)
        .get_result(conn)?)
}

/// Inserts or fetches a category from the database.
pub fn insert_or_get(new_category: &NewCategory, conn: &DbConn) -> Result<Category> {
    use crate::schema::categories::dsl::*;
    // Unfortunately, Postgres doesn't return the existing row with
    // on_conflict_do_nothing, so we have to work around this by perform an 'empty' update.
    Ok(diesel::insert_into(categories)
        .values(new_category)
        .on_conflict(key)
        .do_update()
        .set(key.eq(key))
        .get_result(conn)?)
}

/// Updates a category in the database.
pub fn update(category_id: i32, update_category: &UpdateCategory, conn: &DbConn) -> Result<Category> {
    use crate::schema::categories::dsl::*;
    Ok(diesel::update(categories)
        .filter(id.eq(category_id))
        .set(update_category)
        .get_result(conn)?)
}
