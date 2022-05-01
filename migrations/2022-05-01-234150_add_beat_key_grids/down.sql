-- Removes beat/key-grids from tracks.

ALTER TABLE tracks
    DROP COLUMN keys,
    DROP COLUMN beats;
