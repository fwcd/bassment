-- Set up basic schema.

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE track_artists (
    track_id INT REFERENCES tracks(id),
    artist_id INT REFERENCES artists(id),
    CONSTRAINT track_artist_pkey PRIMARY KEY (track_id, artist_id)
);
