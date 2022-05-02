-- Simplify the file info table.

ALTER TABLE file_infos
    DROP COLUMN location,
    DROP COLUMN is_local;
