use serde::{Deserialize, Serialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Queryable)]
pub struct Settings {
    #[serde(skip_serializing)]
    pub id: bool,
    pub allow_unauthenticated_access: bool,
    pub file_storage_base_directory: String,
}

#[derive(Debug, Clone, Deserialize, AsChangeset)]
#[table_name = "settings"]
pub struct UpdateSettings {
    pub allow_unauthenticated_access: Option<bool>,
    pub file_storage_base_directory: Option<String>,
}
