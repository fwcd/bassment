use std::time::SystemTime;

use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Genre {
    pub id: i32,
    pub name: String,
    pub last_modified_at: SystemTime,
}
