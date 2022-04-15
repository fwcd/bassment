use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Resource {
    pub id: i32,
    pub location: String,
    pub is_local: bool,
    pub kind: i32, // TODO: Strongly typed as enum?
}
