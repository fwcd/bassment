use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};

use crate::{models::{User, NewUser}, error::Result, db::DbConn};
use crate::schema::users::dsl::*;

/// Fetches all users from the database.
pub fn all(conn: &DbConn) -> Result<Vec<User>> {
    Ok(users.get_results(conn)?)
}

/// Looks up a user by username name.
pub fn by_username(filtered_name: &str, conn: &DbConn) -> Result<User> {
    Ok(users.filter(username.eq(filtered_name))
        .get_result(conn)?)
}

/// Inserts a user into the database.
pub fn insert(new_user: &NewUser, conn: &DbConn) -> Result<User> {
    Ok(diesel::insert_into(users)
        .values(new_user)
        .get_result(conn)?)
}
