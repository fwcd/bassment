table! {
    use diesel::sql_types::*;
    use crate::models::*;

    album_artists (album_id, artist_id) {
        album_id -> Int4,
        artist_id -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    albums (id) {
        id -> Int4,
        name -> Text,
        description -> Nullable<Text>,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    artists (id) {
        id -> Int4,
        name -> Text,
        description -> Nullable<Text>,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
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

    file_infos (id) {
        id -> Int4,
        last_modified_at -> Timestamp,
        name -> Text,
        media_type -> Text,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    genres (id) {
        id -> Int4,
        name -> Text,
        description -> Nullable<Text>,
        last_modified_at -> Timestamp,
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

    settings (id) {
        id -> Bool,
        file_storage_base_directory -> Text,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    tag_categories (id) {
        id -> Int4,
        key -> Text,
        collection_name -> Text,
        predefined -> Bool,
        description -> Nullable<Text>,
        last_modified_at -> Timestamp,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    tags (id) {
        id -> Int4,
        category_id -> Nullable<Int4>,
        value -> Text,
        description -> Nullable<Text>,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
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

    track_artists (track_id, artist_id) {
        track_id -> Int4,
        artist_id -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    track_audios (track_id, file_id) {
        track_id -> Int4,
        file_id -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    track_tags (track_id, tag_id) {
        track_id -> Int4,
        tag_id -> Int4,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::models::*;

    tracks (id) {
        id -> Int4,
        title -> Text,
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

joinable!(album_artists -> albums (album_id));
joinable!(album_artists -> artists (artist_id));
joinable!(albums -> file_infos (cover_art_id));
joinable!(artists -> file_infos (cover_art_id));
joinable!(cues -> tracks (track_id));
joinable!(playlist_tracks -> playlists (playlist_id));
joinable!(playlist_tracks -> tracks (track_id));
joinable!(playlist_tracks -> users (added_by));
joinable!(playlists -> file_infos (cover_art_id));
joinable!(playlists -> users (added_by));
joinable!(tags -> file_infos (cover_art_id));
joinable!(tags -> tag_categories (category_id));
joinable!(track_artists -> artists (artist_id));
joinable!(track_artists -> tracks (track_id));
joinable!(track_audios -> file_infos (file_id));
joinable!(track_audios -> tracks (track_id));
joinable!(track_tags -> tags (tag_id));
joinable!(track_tags -> tracks (track_id));
joinable!(tracks -> users (added_by));

allow_tables_to_appear_in_same_query!(
    album_artists,
    albums,
    artists,
    blobs,
    cues,
    file_infos,
    genres,
    playlist_tracks,
    playlists,
    settings,
    tag_categories,
    tags,
    token_secret,
    track_artists,
    track_audios,
    track_tags,
    tracks,
    users,
);
