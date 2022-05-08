use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

use super::{PartialGenre, PartialAlbum};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct Track {
    pub id: i32,
    pub name: String,
    pub year: Option<String>,
    pub comment: Option<String>,
    pub duration_ms: Option<i32>,
    pub sample_rate: Option<i32>,
    pub channels: Option<i32>,
    pub bpm: Option<f64>,
    pub times_played: i32,
    pub rating: Option<i32>,
    pub key: Option<String>,
    pub color: Option<i32>,
    pub added_at: SystemTime,
    pub last_modified_at: SystemTime,
    pub last_played_at: Option<SystemTime>,
    pub added_by: Option<i32>,
    pub beats: Option<i32>,
    pub keys: Option<i32>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct AnnotatedTrack {
    #[serde(flatten)]
    pub track: Track,
    pub artists: Vec<PartialGenre>,
    pub albums: Vec<PartialAlbum>,
    pub genres: Vec<PartialGenre>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct TrackArtist {
    pub track_id: i32,
    pub artist_id: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct TrackAlbum {
    pub track_id: i32,
    pub album_id: i32,
    pub position: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
pub struct TrackGenre {
    pub track_id: i32,
    pub genre_id: i32,
}

// TODO: Add other fields to NewTrack and UpdateTrack

#[derive(Debug, Clone, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[table_name = "tracks"]
pub struct NewTrack {
    pub name: String,
}

#[derive(Debug, Clone, Deserialize, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[table_name = "tracks"]
pub struct UpdateTrack {
    pub name: Option<String>,
}
