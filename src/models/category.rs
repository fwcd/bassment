use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;
use crate::utils::serde::deserialize_optional_field;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct Category {
    pub id: i32,
    pub key: String,
    pub display_name: String,
    pub predefined: bool,
    pub hidden: bool,
    pub description: Option<String>,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[table_name = "categories"]
pub struct NewCategory {
    pub key: String,
    pub display_name: String,
    pub hidden: Option<bool>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Deserialize, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[table_name = "categories"]
pub struct UpdateCategory {
    pub key: Option<String>,
    pub display_name: Option<String>,
    pub hidden: Option<bool>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub description: Option<Option<String>>,
}
