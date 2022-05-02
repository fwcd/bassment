use std::time::SystemTime;

use diesel_derive_enum::DbEnum;
use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, DbEnum)]
#[DieselType = "File_kind"]
#[serde(rename_all = "snake_case")]
pub enum FileKind {
    Generic,
    Audio,
    CoverArt,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct FileInfo {
    pub id: i32,
    pub kind: FileKind,
    pub last_modified_at: SystemTime,
    pub name: String,
}

#[derive(Debug, Clone, Insertable, Deserialize)]
#[table_name = "file_infos"]
pub struct NewFileInfo {
    pub kind: FileKind,
    pub name: String,
}

#[derive(Debug, Clone, AsChangeset, Deserialize)]
#[table_name = "file_infos"]
pub struct UpdateFileInfo {
    pub kind: Option<FileKind>,
    pub name: Option<String>,
}
