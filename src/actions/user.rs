use diesel::RunQueryDsl;

use crate::{models::{User, NewUser}, error::Result, db::DbConn};

/// Fetches all users from the database.
pub fn all(conn: &DbConn) -> Result<Vec<User>> {
    use crate::schema::users::dsl::*;

    Ok(users.get_results(conn)?)
}

/// Inserts a user into the database.
pub fn insert(new_user: &NewUser, conn: &DbConn) -> Result<User> {
    use crate::schema::users::dsl::*;

    Ok(diesel::insert_into(users)
        .values(new_user)
        .get_result(conn)?)
}
