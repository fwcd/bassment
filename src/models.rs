use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Artist {
    pub id: i32,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Album {
    pub id: i32,
    pub title: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct Track {
    pub id: i32,
    pub title: String,
    pub album_id: Option<i32>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct TrackArtist {
    pub track_id: i32,
    pub artist_id: i32,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "artist"]
pub struct NewArtist<'a> {
    pub name: &'a str,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "album"]
pub struct NewAlbum<'a> {
    pub title: &'a str,
}

#[derive(Debug, Clone, Insertable)]
#[table_name = "track"]
pub struct NewTrack<'a> {
    pub title: &'a str,
    pub album_id: Option<i32>,
}
