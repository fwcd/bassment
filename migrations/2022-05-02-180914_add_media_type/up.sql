-- Adds a media type column to file info.

ALTER TABLE file_infos
    ADD COLUMN media_type TEXT DEFAULT 'application/octet-stream' NOT NULL;
