table! {
    album (id) {
        id -> Int4,
        title -> Text,
    }
}

table! {
    artist (id) {
        id -> Int4,
        name -> Text,
    }
}

table! {
    track (id) {
        id -> Int4,
        title -> Text,
        album_id -> Nullable<Int4>,
    }
}

table! {
    track_artist (track_id, artist_id) {
        track_id -> Int4,
        artist_id -> Int4,
    }
}

joinable!(track -> album (album_id));
joinable!(track_artist -> artist (artist_id));
joinable!(track_artist -> track (track_id));

allow_tables_to_appear_in_same_query!(
    album,
    artist,
    track,
    track_artist,
);
