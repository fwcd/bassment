-- Add table for externally managed resources

CREATE TABLE resource (
    id SERIAL PRIMARY KEY,
    location TEXT NOT NULL, -- Relative path if is_local, else a URL
    is_local BOOLEAN NOT NULL,
    kind INT -- 1 => audio,
             -- 2 => cover art
);

CREATE TABLE track_audio (
    track_id INT REFERENCES track(id),
    resource_id INT REFERENCES resource(id),
    CONSTRAINT track_audio_pkey PRIMARY KEY (track_id, resource_id)
);

ALTER TABLE artist
    ADD COLUMN cover_art_id INT REFERENCES resource(id);

ALTER TABLE album
    ADD COLUMN cover_art_id INT REFERENCES resource(id);
