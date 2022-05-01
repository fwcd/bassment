table! {
    albums (id) {
        id -> Int4,
        name -> Text,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
        description -> Nullable<Text>,
    }
}

table! {
    artists (id) {
        id -> Int4,
        name -> Text,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
        description -> Nullable<Text>,
    }
}

table! {
    cues (id) {
        id -> Int4,
        track_id -> Nullable<Int4>,
        kind -> Int4,
        position_ms -> Nullable<Int4>,
        length_ms -> Int4,
        hotcue -> Nullable<Int4>,
        label -> Nullable<Text>,
        color -> Nullable<Int4>,
    }
}

table! {
    files (id) {
        id -> Int4,
        location -> Text,
        is_local -> Bool,
        kind -> Nullable<Int4>,
    }
}

table! {
    genres (id) {
        id -> Int4,
        name -> Text,
        last_modified_at -> Timestamp,
        description -> Nullable<Text>,
    }
}

table! {
    playlist_tracks (playlist_id, track_id) {
        playlist_id -> Int4,
        track_id -> Int4,
        track_number -> Nullable<Int4>,
        added_by -> Nullable<Int4>,
    }
}

table! {
    playlists (id) {
        id -> Int4,
        name -> Text,
        kind -> Int4,
        cover_art_id -> Nullable<Int4>,
        parent_id -> Nullable<Int4>,
        position -> Int4,
        last_modified_at -> Timestamp,
        added_by -> Nullable<Int4>,
        description -> Nullable<Text>,
    }
}

table! {
    token_secret (id) {
        id -> Bool,
        secret -> Bytea,
    }
}

table! {
    track_albums (track_id, album_id) {
        track_id -> Int4,
        album_id -> Int4,
        track_number -> Int4,
    }
}

table! {
    track_artists (track_id, artist_id) {
        track_id -> Int4,
        artist_id -> Int4,
    }
}

table! {
    track_audios (track_id, resource_id) {
        track_id -> Int4,
        resource_id -> Int4,
    }
}

table! {
    track_genres (track_id, genre_id) {
        track_id -> Int4,
        genre_id -> Int4,
    }
}

table! {
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
    }
}

table! {
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

joinable!(albums -> files (cover_art_id));
joinable!(artists -> files (cover_art_id));
joinable!(cues -> tracks (track_id));
joinable!(playlist_tracks -> playlists (playlist_id));
joinable!(playlist_tracks -> tracks (track_id));
joinable!(playlist_tracks -> users (added_by));
joinable!(playlists -> files (cover_art_id));
joinable!(playlists -> users (added_by));
joinable!(track_albums -> albums (album_id));
joinable!(track_albums -> tracks (track_id));
joinable!(track_artists -> artists (artist_id));
joinable!(track_artists -> tracks (track_id));
joinable!(track_audios -> files (resource_id));
joinable!(track_audios -> tracks (track_id));
joinable!(track_genres -> genres (genre_id));
joinable!(track_genres -> tracks (track_id));
joinable!(tracks -> users (added_by));

allow_tables_to_appear_in_same_query!(
    albums,
    artists,
    cues,
    files,
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
