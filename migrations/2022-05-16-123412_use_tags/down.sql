-- Add 'crate' enum case.

ALTER TYPE playlist_kind
    ADD VALUE 'crate';
COMMIT;

-- Migrate back to the existing tables of artists etc.

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cover_art_id INT REFERENCES file_infos(id),
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cover_art_id INT REFERENCES file_infos(id),
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE album_artists (
    album_id INT REFERENCES albums(id),
    artist_id INT REFERENCES artists(id),
    CONSTRAINT album_artists_pkey PRIMARY KEY (album_id, artist_id)
);

CREATE TABLE track_artists (
    track_id INT REFERENCES tracks(id),
    artist_id INT REFERENCES artists(id),
    CONSTRAINT track_artists_pkey PRIMARY KEY (track_id, artist_id)
);

CREATE TABLE track_albums (
    track_id INT REFERENCES tracks(id),
    album_id INT REFERENCES albums(id),
    CONSTRAINT track_albums_pkey PRIMARY KEY (track_id, album_id)
);

CREATE TABLE track_genres (
    track_id INT REFERENCES tracks(id),
    genre_id INT REFERENCES genres(id),
    CONSTRAINT track_genres_pkey PRIMARY KEY (track_id, genre_id)
);

-- Migrate artists, albums, crates and genres

INSERT INTO artists (name, description, cover_art_id)
    SELECT value, tags.description, cover_art_id
    FROM tags
        JOIN tag_categories ON (category_id = tag_categories.id)
    WHERE key = 'artist';

INSERT INTO albums (name, description, cover_art_id)
    SELECT value, tags.description, cover_art_id
    FROM tags
        JOIN tag_categories ON (category_id = tag_categories.id)
    WHERE key = 'album';

INSERT INTO genres (name, description)
    SELECT value, tags.description
    FROM tags
        JOIN tag_categories ON (category_id = tag_categories.id)
    WHERE key = 'genre';

INSERT INTO playlists (kind, name, description, position, cover_art_id)
    SELECT 'crate', value, tags.description, 1, cover_art_id -- TODO: We should use a proper/incrementing position here
    FROM tags
        JOIN tag_categories ON (category_id = tag_categories.id)
    WHERE key = 'crate';

-- Migrate associations.

INSERT INTO track_artists (track_id, artist_id)
    SELECT track_id, artists.id
    FROM track_tags
        JOIN tags ON (category_id = 1 AND tag_id = tags.id)
        JOIN artists ON (artists.name = tags.value);

INSERT INTO track_albums (track_id, album_id)
    SELECT track_id, albums.id
    FROM track_tags
        JOIN tags ON (category_id = 2 AND tag_id = tags.id)
        JOIN albums ON (albums.name = tags.value);

INSERT INTO track_genres (track_id, genre_id)
    SELECT track_id, genres.id
    FROM track_tags
        JOIN tags ON (category_id = 4 AND tag_id = tags.id)
        JOIN genres ON (genres.name = tags.value);

INSERT INTO playlist_tracks (track_id, playlist_id)
    SELECT track_id, playlists.id
    FROM track_tags
        JOIN tags ON (category_id = 3 AND tag_id = tags.id)
        JOIN playlists ON (playlists.name = tags.value);

-- Delete old tables.

DROP TABLE track_tags;
DROP TABLE tags;
DROP TABLE tag_categories;
