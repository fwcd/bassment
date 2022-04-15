use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Album {
    pub id: i32,
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "albums"]
pub struct NewAlbum<'a> {
    pub name: &'a str,
}
