use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;
use crate::utils::serde::deserialize_optional_field;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Genre {
    pub id: i32,
    pub name: String,
    pub last_modified_at: SystemTime,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Insertable)]
#[table_name = "genres"]
pub struct NewGenre {
    pub name: String,
}

#[derive(Debug, Clone, Deserialize, AsChangeset)]
#[table_name = "genres"]
pub struct UpdateGenre {
    pub name: Option<String>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub description: Option<Option<String>>,
}
