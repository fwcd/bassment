-- Adds a modification date column and the corresponding hook to blobs and file locations.

ALTER TABLE blobs
    ADD COLUMN last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL;

ALTER TABLE files
    ADD COLUMN last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL;

SELECT manage_last_modified('blobs');
SELECT manage_last_modified('files');
