-- Remove user table etc.

SELECT unmanage_last_modified('users');

ALTER TABLE tracks
    DROP COLUMN added_by;

ALTER TABLE playlists
    DROP COLUMN added_by;

ALTER TABLE playlist_tracks
    DROP COLUMN added_by;

DROP TABLE users;
