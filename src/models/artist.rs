use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;
use crate::utils::serde::deserialize_optional_field;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct Artist {
    pub id: i32,
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub last_modified_at: SystemTime,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct PartialArtist {
    pub id: i32,
    pub name: String,
}

#[derive(Debug, Clone, Insertable, Deserialize)]
#[serde(rename_all = "camelCase")]
#[table_name = "artists"]
pub struct NewArtist {
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub description: Option<String>,
}

impl NewArtist {
    pub fn named(name: &str) -> Self {
        Self {
            name: name.to_owned(),
            cover_art_id: None,
            description: None,
        }
    }
}

#[derive(Debug, Clone, AsChangeset, Deserialize)]
#[serde(rename_all = "camelCase")]
#[table_name = "artists"]
pub struct UpdateArtist {
    pub name: Option<String>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub cover_art_id: Option<Option<i32>>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub description: Option<Option<String>>,
}
