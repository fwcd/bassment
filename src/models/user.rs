use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

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
    pub password_hash: &'a str,
}
