-- Add track metadata columns

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE track_albums (
    track_id INT REFERENCES tracks(id),
    album_id INT REFERENCES albums(id),
    CONSTRAINT track_album_pkey PRIMARY KEY (track_id, album_id),
    track_number INT NOT NULL
);

CREATE TABLE track_genres (
    track_id INT REFERENCES tracks(id),
    genre_id INT REFERENCES genres(id),
    CONSTRAINT track_genre_pkey PRIMARY KEY (track_id, genre_id)
);

ALTER TABLE tracks
    ADD COLUMN year TEXT,
    ADD COLUMN comment TEXT,
    ADD COLUMN duration_ms INT,
    ADD COLUMN sample_rate INT,
    ADD COLUMN channels INT,
    ADD COLUMN bpm FLOAT,
    ADD COLUMN times_played INT DEFAULT 0 NOT NULL,
    ADD COLUMN rating INT,
    ADD COLUMN key TEXT,
    ADD COLUMN color INT,
    ADD COLUMN added_at TIMESTAMP DEFAULT NOW() NOT NULL,
    ADD COLUMN last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
    ADD COLUMN last_played_at TIMESTAMP;
