table! {
    album (id) {
        id -> Int4,
        title -> Text,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
    }
}

table! {
    artist (id) {
        id -> Int4,
        name -> Text,
        cover_art_id -> Nullable<Int4>,
        last_modified_at -> Timestamp,
    }
}

table! {
    cue (id) {
        id -> Int4,
        track_id -> Nullable<Int4>,
        #[sql_name = "type"]
        type_ -> Nullable<Int4>,
        position_ms -> Nullable<Int4>,
        length_ms -> Int4,
        hotcue -> Nullable<Int4>,
        label -> Nullable<Text>,
        color -> Nullable<Int4>,
    }
}

table! {
    genre (id) {
        id -> Int4,
        name -> Text,
        last_modified_at -> Timestamp,
    }
}

table! {
    resource (id) {
        id -> Int4,
        location -> Text,
        is_local -> Bool,
        kind -> Nullable<Int4>,
    }
}

table! {
    track (id) {
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
    }
}

table! {
    track_album (track_id, album_id) {
        track_id -> Int4,
        album_id -> Int4,
        track_number -> Int4,
    }
}

table! {
    track_artist (track_id, artist_id) {
        track_id -> Int4,
        artist_id -> Int4,
    }
}

table! {
    track_audio (track_id, resource_id) {
        track_id -> Int4,
        resource_id -> Int4,
    }
}

table! {
    track_genre (track_id, genre_id) {
        track_id -> Int4,
        genre_id -> Int4,
    }
}

joinable!(album -> resource (cover_art_id));
joinable!(artist -> resource (cover_art_id));
joinable!(cue -> track (track_id));
joinable!(track_album -> album (album_id));
joinable!(track_album -> track (track_id));
joinable!(track_artist -> artist (artist_id));
joinable!(track_artist -> track (track_id));
joinable!(track_audio -> resource (resource_id));
joinable!(track_audio -> track (track_id));
joinable!(track_genre -> genre (genre_id));
joinable!(track_genre -> track (track_id));

allow_tables_to_appear_in_same_query!(
    album,
    artist,
    cue,
    genre,
    resource,
    track,
    track_album,
    track_artist,
    track_audio,
    track_genre,
);
