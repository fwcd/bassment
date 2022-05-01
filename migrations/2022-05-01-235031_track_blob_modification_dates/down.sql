-- Removes the modification date column and hook from blobs and file locations.

SELECT unmanage_last_modified('files');
SELECT unmanage_last_modified('blobs');

ALTER TABLE files
    DROP COLUMN last_modified_at;

ALTER TABLE blobs
    DROP COLUMN last_modified_at;
