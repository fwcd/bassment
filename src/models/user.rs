use std::time::SystemTime;

use bcrypt::DEFAULT_COST;
use serde::{Serialize, Deserialize};

use crate::{schema::*, error::Result};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: Option<String>,
    pub password_hash: String,
    pub added_at: SystemTime,
    pub is_admin: bool,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub password_hash: String,
}

impl<'a> NewUser<'a> {
    pub fn new(username: &'a str, password: &'a str) -> Result<Self> {
        Ok(Self {
            username,
            password_hash: bcrypt::hash(password, DEFAULT_COST)?,
        })
    }
}
