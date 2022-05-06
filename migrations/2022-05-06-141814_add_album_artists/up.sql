-- Relates artists to an album.

CREATE TABLE album_artists (
    album_id INT REFERENCES albums(id),
    artist_id INT REFERENCES artists(id),
    CONSTRAINT album_artist_pkey PRIMARY KEY (album_id, artist_id)
);
