use std::time::SystemTime;

use diesel_derive_enum::DbEnum;
use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, DbEnum)]
#[serde(rename_all = "camelCase")]
#[DieselType = "File_kind"]
pub enum FileKind {
    Generic,
    Audio,
    CoverArt,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct FileInfo {
    pub id: i32,
    pub kind: FileKind,
    pub last_modified_at: SystemTime,
    pub name: String,
    pub media_type: String,
}

#[derive(Debug, Clone, Insertable, Deserialize)]
#[serde(rename_all = "camelCase")]
#[table_name = "file_infos"]
pub struct NewFileInfo {
    pub kind: FileKind,
    pub name: String,
    pub media_type: String,
}

#[derive(Debug, Clone, AsChangeset, Deserialize)]
#[serde(rename_all = "camelCase")]
#[table_name = "file_infos"]
pub struct UpdateFileInfo {
    pub kind: Option<FileKind>,
    pub name: Option<String>,
    pub media_type: Option<String>,
}
