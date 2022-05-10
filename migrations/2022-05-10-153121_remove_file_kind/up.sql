-- Remove the file kind (we have the media type already).

ALTER TABLE file_infos
    DROP COLUMN kind;
