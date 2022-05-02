use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct FileLocation {
    pub id: i32,
    pub location: String,
    pub is_local: bool,
    pub kind: Option<i32>, // TODO: Better typing as enum
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Insertable, Deserialize)]
#[table_name = "file_locations"]
pub struct NewFileLocation {
    pub location: String,
    pub is_local: bool,
    pub kind: Option<i32>, // TODO: Better typing as enum
}

#[derive(Debug, Clone, AsChangeset, Deserialize)]
#[table_name = "file_locations"]
pub struct UpdateFileLocation {
    pub location: Option<String>,
    pub is_local: Option<bool>,
    pub kind: Option<i32>, // TODO: Better typing as enum
}
