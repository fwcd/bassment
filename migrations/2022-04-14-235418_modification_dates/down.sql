-- Remove modification date columns and triggers.

SELECT unmanage_last_modified('artist');
SELECT unmanage_last_modified('album');
SELECT unmanage_last_modified('genre');
SELECT unmanage_last_modified('track');

DROP FUNCTION IF EXISTS unmanage_last_modified();
DROP FUNCTION IF EXISTS manage_last_modified();
DROP FUNCTION IF EXISTS update_last_modified();

ALTER TABLE genre
    DROP COLUMN last_modified_at;

ALTER TABLE album
    DROP COLUMN last_modified_at;

ALTER TABLE artist
    DROP COLUMN last_modified_at;

