use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;
use crate::utils::serde::deserialize_optional_field;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Blob {
    pub id: i32,
    pub data: Vec<u8>,
    pub version: String,
    pub sub_version: Option<String>,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Insertable, Deserialize)]
#[table_name = "blobs"]
pub struct NewBlob {
    pub data: Vec<u8>,
    pub version: String,
    pub sub_version: Option<String>,
}

#[derive(Debug, Clone, AsChangeset, Deserialize)]
#[table_name = "blobs"]
pub struct UpdateBlob {
    pub data: Option<Vec<u8>>,
    pub version: Option<String>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub sub_version: Option<Option<String>>,
}
