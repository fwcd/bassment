use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Album {
    pub id: i32,
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub last_modified_at: SystemTime,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "albums"]
pub struct NewAlbum {
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, AsChangeset)]
#[table_name = "albums"]
pub struct UpdateAlbum {
    pub name: Option<String>,
    pub cover_art_id: Option<i32>,
    pub description: Option<String>,
}
