-- Removes the media type column.

ALTER TABLE file_infos
    DROP COLUMN media_type;
