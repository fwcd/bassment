use std::time::SystemTime;

use diesel_derive_enum::DbEnum;
use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, DbEnum)]
#[DieselType = "File_kind"]
#[serde(rename_all = "snake_case")]
pub enum FileKind {
    Audio,
    CoverArt,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct FileLocation {
    pub id: i32,
    pub location: String,
    pub is_local: bool,
    pub kind: FileKind,
    pub last_modified_at: SystemTime,
    pub name: String,
}

#[derive(Debug, Clone, Insertable, Deserialize)]
#[table_name = "file_locations"]
pub struct NewFileLocation {
    pub location: String,
    pub is_local: bool,
    pub kind: FileKind,
    pub name: String,
}

#[derive(Debug, Clone, AsChangeset, Deserialize)]
#[table_name = "file_locations"]
pub struct UpdateFileLocation {
    pub is_local: Option<bool>,
    pub kind: Option<FileKind>,
    pub name: Option<String>,
}
