use std::time::SystemTime;

use bcrypt::DEFAULT_COST;
use serde::{Serialize, Deserialize};

use crate::{schema::*, error::Result};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: Option<String>,
    pub password_hash: String,
    pub added_at: SystemTime,
    pub is_admin: bool,
    pub last_modified_at: SystemTime,
}

impl User {
    /// Checks whether the stored hash matches the given password.
    pub fn password_matches(&self, password: &str) -> Result<bool> {
        Ok(bcrypt::verify(password, &self.password_hash)?)
    }
}

#[derive(Debug, Clone, Insertable, AsChangeset, Deserialize)]
#[serde(rename_all = "camelCase")]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub password_hash: String,
    pub is_admin: bool,
}

impl<'a> NewUser<'a> {
    /// Creates a new user from the given credentials, hashing the password.
    pub fn new(username: &'a str, password: &'a str, is_admin: bool) -> Result<Self> {
        Ok(Self {
            username,
            password_hash: bcrypt::hash(password, DEFAULT_COST)?,
            is_admin,
        })
    }
}
