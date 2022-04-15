-- Add user table etc.

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT NOW() NOT NULL,
    last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL
);

SELECT manage_last_modified('user');

ALTER TABLE track
    ADD COLUMN added_by INT REFERENCES user(id);

ALTER TABLE playlist
    ADD COLUMN added_by INT REFERENCES user(id);

ALTER TABLE playlist_track
    ADD COLUMN added_by INT REFERENCES user(id);
