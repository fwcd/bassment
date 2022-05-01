use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

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
