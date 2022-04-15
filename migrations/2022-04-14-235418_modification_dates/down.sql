-- Remove modification date columns and triggers.

SELECT unmanage_last_modified('artists');
SELECT unmanage_last_modified('albums');
SELECT unmanage_last_modified('genres');
SELECT unmanage_last_modified('tracks');

DROP FUNCTION IF EXISTS unmanage_last_modified();
DROP FUNCTION IF EXISTS manage_last_modified();
DROP FUNCTION IF EXISTS update_last_modified();

ALTER TABLE genres
    DROP COLUMN last_modified_at;

ALTER TABLE albums
    DROP COLUMN last_modified_at;

ALTER TABLE artists
    DROP COLUMN last_modified_at;

