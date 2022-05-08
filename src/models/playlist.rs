use std::time::SystemTime;

use diesel_derive_enum::DbEnum;
use serde::{Serialize, Deserialize};

use crate::schema::*;
use crate::utils::serde::deserialize_optional_field;

#[derive(Debug, Clone, Serialize, Deserialize, DbEnum)]
#[serde(rename_all = "camelCase")]
#[DieselType = "Playlist_kind"]
pub enum PlaylistKind {
    Playlist,
    Folder,
    Crate,
    SetLog,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct Playlist {
    pub id: i32,
    pub name: String,
    pub kind: PlaylistKind,
    pub cover_art_id: Option<i32>,
    pub parent_id: Option<i32>,
    pub position: i32,
    pub last_modified_at: SystemTime,
    pub added_by: Option<i32>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistTreeNode {
    #[serde(flatten)]
    pub playlist: Playlist,
    pub children: Vec<PlaylistTreeNode>,
}

#[derive(Debug, Clone, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[table_name = "playlists"]
pub struct NewPlaylist {
    pub name: String,
    pub kind: PlaylistKind,
    pub cover_art_id: Option<i32>,
    pub parent_id: Option<i32>,
    pub position: i32,
    pub added_by: Option<i32>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Deserialize, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[table_name = "playlists"]
pub struct UpdatePlaylist {
    pub name: Option<String>,
    pub kind: Option<PlaylistKind>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub cover_art_id: Option<Option<i32>>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub parent_id: Option<Option<i32>>,
    pub position: Option<i32>,
    #[serde(deserialize_with = "deserialize_optional_field")]
    pub description: Option<Option<String>>,
}
