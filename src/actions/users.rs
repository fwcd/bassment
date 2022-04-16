use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};
use passwords::PasswordGenerator;

use crate::{models::{User, NewUser}, error::{Result, Error}, db::DbConn};
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

/// Fetches the root user.
pub fn root(conn: &DbConn) -> Result<User> {
    by_username("root", conn)
}

/// Inserts a user into the database.
pub fn insert(new_user: &NewUser, conn: &DbConn) -> Result<User> {
    Ok(diesel::insert_into(users)
        .values(new_user)
        .get_result(conn)?)
}

/// Creates a new root user and returns the password.
pub fn generate_root(conn: &DbConn) -> Result<(String, User)> {
    let password = PasswordGenerator::new().length(48).generate_one()
        .map_err(|e| Error::Internal(format!("Could not generate root password: {}", e)))?;
    let user = insert(&NewUser::new("root", &password, /* is_admin */ true)?, conn)?;
    Ok((password, user))
}
