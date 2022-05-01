-- Add a table for arbitrary blobs (including e.g. beatmaps, keymaps, ...).

CREATE TABLE blobs (
    id SERIAL PRIMARY KEY,
    data BYTEA NOT NULL,
    version TEXT NOT NULL, -- e.g. BeatMap-1.0, KeyMap-1.0
    sub_version TEXT
);
