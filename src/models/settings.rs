use serde::{Deserialize, Serialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct Settings {
    #[serde(skip_serializing)]
    pub id: bool,
    pub file_storage_base_directory: String,
}

#[derive(Debug, Clone, Deserialize, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[table_name = "settings"]
pub struct UpdateSettings {
    pub file_storage_base_directory: Option<String>,
}
