use std::time::SystemTime;

use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Artist {
    pub id: i32,
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Album {
    pub id: i32,
    pub name: String,
    pub cover_art_id: Option<i32>,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Track {
    pub id: i32,
    pub name: String,
    pub year: Option<String>,
    pub comment: Option<String>,
    pub duration_ms: Option<i32>,
    pub sample_rate: Option<i32>,
    pub channels: Option<i32>,
    pub bpm: Option<i32>,
    pub times_played: usize,
    pub rating: Option<i32>,
    pub key: Option<String>,
    pub color: Option<i32>,
    pub added_at: SystemTime,
    pub last_modified_at: SystemTime,
    pub last_played_at: Option<SystemTime>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Genre {
    pub id: i32,
    pub name: String,
    pub last_modified_at: SystemTime,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Resource {
    pub id: i32,
    pub location: String,
    pub is_local: bool,
    pub kind: i32, // TODO: Strongly typed as enum?
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct TrackArtist {
    pub track_id: i32,
    pub artist_id: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct TrackAlbum {
    pub track_id: i32,
    pub album_id: i32,
    pub position: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct TrackGenre {
    pub track_id: i32,
    pub genre_id: i32,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "artists"]
pub struct NewArtist<'a> {
    pub name: &'a str,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "albums"]
pub struct NewAlbum<'a> {
    pub name: &'a str,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "tracks"]
pub struct NewTrack<'a> {
    pub name: &'a str,
}
