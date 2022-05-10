use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct FileInfo {
    pub id: i32,
    pub last_modified_at: SystemTime,
    pub name: String,
    pub media_type: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct PartialFileInfo {
    pub id: i32,
    pub name: String,
    pub media_type: String,
}

#[derive(Debug, Clone, Insertable, Deserialize)]
#[serde(rename_all = "camelCase")]
#[table_name = "file_infos"]
pub struct NewFileInfo {
    pub name: String,
    pub media_type: String,
}

#[derive(Debug, Clone, AsChangeset, Deserialize)]
#[serde(rename_all = "camelCase")]
#[table_name = "file_infos"]
pub struct UpdateFileInfo {
    pub name: Option<String>,
    pub media_type: Option<String>,
}
