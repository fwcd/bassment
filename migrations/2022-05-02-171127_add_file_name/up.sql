-- Adds a name column to the files table.

ALTER TABLE file_locations
    ADD COLUMN name TEXT NOT NULL;
