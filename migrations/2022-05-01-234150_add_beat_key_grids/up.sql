-- Adds beat/key-grids to tracks.

ALTER TABLE tracks
    ADD COLUMN beats INT REFERENCES blobs(id),
    ADD COLUMN keys INT REFERENCES blobs(id);
