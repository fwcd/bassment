table! {
    use diesel::sql_types::*;
    use crate::models::*;

    albums (id) {
        id -> Int4,
        name -> Text,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
        description -> Nullable<Text>,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    artists (id) {
        id -> Int4,
        name -> Text,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
        description -> Nullable<Text>,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    blobs (id) {
        id -> Int4,
        data -> Bytea,
        version -> Text,
        sub_version -> Nullable<Text>,
        last_modified_at -> Timestamp,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    cues (id) {
        id -> Int4,
        track_id -> Nullable<Int4>,
        kind -> Cue_kind,
        position_ms -> Nullable<Int4>,
        length_ms -> Int4,
        hotcue -> Nullable<Int4>,
        label -> Nullable<Text>,
        color -> Nullable<Int4>,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    file_locations (id) {
        id -> Int4,
        location -> Text,
        is_local -> Bool,
        kind -> File_kind,
        last_modified_at -> Timestamp,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    genres (id) {
        id -> Int4,
        name -> Text,
        last_modified_at -> Timestamp,
        description -> Nullable<Text>,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    playlist_tracks (playlist_id, track_id) {
        playlist_id -> Int4,
        track_id -> Int4,
        track_number -> Nullable<Int4>,
        added_by -> Nullable<Int4>,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    playlists (id) {
        id -> Int4,
        name -> Text,
        kind -> Playlist_kind,
        cover_art_id -> Nullable<Int4>,
        parent_id -> Nullable<Int4>,
        position -> Int4,
        last_modified_at -> Timestamp,
        added_by -> Nullable<Int4>,
        description -> Nullable<Text>,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    token_secret (id) {
        id -> Bool,
        secret -> Bytea,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    track_albums (track_id, album_id) {
        track_id -> Int4,
        album_id -> Int4,
        track_number -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    track_artists (track_id, artist_id) {
        track_id -> Int4,
        artist_id -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    track_audios (track_id, resource_id) {
        track_id -> Int4,
        resource_id -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    track_genres (track_id, genre_id) {
        track_id -> Int4,
        genre_id -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    tracks (id) {
        id -> Int4,
        name -> Text,
        year -> Nullable<Text>,
        comment -> Nullable<Text>,
        duration_ms -> Nullable<Int4>,
        sample_rate -> Nullable<Int4>,
        channels -> Nullable<Int4>,
        bpm -> Nullable<Float8>,
        times_played -> Int4,
        rating -> Nullable<Int4>,
        key -> Nullable<Text>,
        color -> Nullable<Int4>,
        added_at -> Timestamp,
        last_modified_at -> Timestamp,
        last_played_at -> Nullable<Timestamp>,
        added_by -> Nullable<Int4>,
        beats -> Nullable<Int4>,
        keys -> Nullable<Int4>,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    users (id) {
        id -> Int4,
        username -> Text,
        email -> Nullable<Text>,
        password_hash -> Text,
        added_at -> Timestamp,
        is_admin -> Bool,
        last_modified_at -> Timestamp,
    }
}

joinable!(albums -> file_locations (cover_art_id));
joinable!(artists -> file_locations (cover_art_id));
joinable!(cues -> tracks (track_id));
joinable!(playlist_tracks -> playlists (playlist_id));
joinable!(playlist_tracks -> tracks (track_id));
joinable!(playlist_tracks -> users (added_by));
joinable!(playlists -> file_locations (cover_art_id));
joinable!(playlists -> users (added_by));
joinable!(track_albums -> albums (album_id));
joinable!(track_albums -> tracks (track_id));
joinable!(track_artists -> artists (artist_id));
joinable!(track_artists -> tracks (track_id));
joinable!(track_audios -> file_locations (resource_id));
joinable!(track_audios -> tracks (track_id));
joinable!(track_genres -> genres (genre_id));
joinable!(track_genres -> tracks (track_id));
joinable!(tracks -> users (added_by));

allow_tables_to_appear_in_same_query!(
    albums,
    artists,
    blobs,
    cues,
    file_locations,
    genres,
    playlist_tracks,
    playlists,
    token_secret,
    track_albums,
    track_artists,
    track_audios,
    track_genres,
    tracks,
    users,
);
