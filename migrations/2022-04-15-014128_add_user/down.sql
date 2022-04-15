-- Remove user table etc.

SELECT unmanage_last_modified('user');

ALTER TABLE track
    DROP COLUMN added_by;

ALTER TABLE playlist
    DROP COLUMN added_by;

ALTER TABLE playlist_track
    DROP COLUMN added_by;

DROP TABLE user;
