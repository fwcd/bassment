use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "artist"]
pub struct Artist {
    pub id: i32,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "album"]
pub struct Album {
    pub id: i32,
    pub title: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "track"]
pub struct Track {
    pub id: i32,
    pub title: String,
    pub album_id: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "track_artist"]
pub struct TrackArtist {
    pub track_id: i32,
    pub artist_id: i32,
}
