-- Add table for externally managed resources

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    location TEXT NOT NULL, -- Relative path if is_local, else a URL
    is_local BOOLEAN NOT NULL,
    kind INT -- 1 => audio,
             -- 2 => cover art
);

CREATE TABLE track_audios (
    track_id INT REFERENCES tracks(id),
    resource_id INT REFERENCES resources(id),
    CONSTRAINT track_audio_pkey PRIMARY KEY (track_id, resource_id)
);

ALTER TABLE artists
    ADD COLUMN cover_art_id INT REFERENCES resources(id);

ALTER TABLE albums
    ADD COLUMN cover_art_id INT REFERENCES resources(id);
