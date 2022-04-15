use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Artist {
    pub id: i32,
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "artists"]
pub struct NewArtist<'a> {
    pub name: &'a str,
}
