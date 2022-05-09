-- Undo the rename of resource_id.

ALTER TABLE track_audios
    RENAME COLUMN file_id TO resource_id;
