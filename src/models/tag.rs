use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;
use crate::utils::serde::deserialize_optional_field;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct Tag {
    pub id: i32,
    pub category_id: i32,
    pub value: String,
    pub description: Option<String>,
    pub cover_art_id: Option<i32>,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct AnnotatedTag {
    pub id: i32,
    pub key: String,
    pub display_name: String,
    pub value: String,
}

#[derive(Debug, Clone, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[table_name = "tags"]
pub struct NewTag {
    pub category_id: i32,
    pub value: String,
    pub description: Option<String>,
    pub cover_art_id: Option<i32>,
}

impl NewTag {
    fn basic(category_id: i32, value: &str) -> Self {
        Self {
            category_id,
            value: value.to_owned(),
            description: None,
            cover_art_id: None,
        }
    }

    pub fn artist(value: &str) -> Self { Self::basic(1, value) }

    pub fn album(value: &str) -> Self { Self::basic(2, value) }

    pub fn crate_(value: &str) -> Self { Self::basic(3, value) }

    pub fn genre(value: &str) -> Self { Self::basic(4, value) }

    pub fn mood(value: &str) -> Self { Self::basic(5, value) }
}

#[derive(Debug, Clone, Deserialize, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[table_name = "tags"]
pub struct UpdateTag {
    pub category_id: Option<i32>,
    pub value: Option<String>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub description: Option<Option<String>>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub cover_art_id: Option<Option<i32>>,
}
