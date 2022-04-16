-- Add user table etc.

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT NOW() NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL,
    last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL
);

SELECT manage_last_modified('users');

ALTER TABLE tracks
    ADD COLUMN added_by INT REFERENCES users(id);

ALTER TABLE playlists
    ADD COLUMN added_by INT REFERENCES users(id);

ALTER TABLE playlist_tracks
    ADD COLUMN added_by INT REFERENCES users(id);
