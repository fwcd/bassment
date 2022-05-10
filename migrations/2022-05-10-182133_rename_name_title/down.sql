-- Rename 'title' column back to 'name'

ALTER TABLE tracks
    RENAME COLUMN title TO name;
