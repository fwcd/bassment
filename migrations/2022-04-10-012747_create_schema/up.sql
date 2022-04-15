-- Set up basic schema.

CREATE TABLE artist (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE album (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE track (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE track_artist (
    track_id INT REFERENCES track(id),
    artist_id INT REFERENCES artist(id),
    CONSTRAINT track_artist_pkey PRIMARY KEY (track_id, artist_id)
);
