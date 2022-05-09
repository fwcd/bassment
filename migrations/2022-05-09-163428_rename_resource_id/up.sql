-- Rename the resource_id column to file_id for consistency.

ALTER TABLE track_audios
    RENAME COLUMN resource_id TO file_id;
