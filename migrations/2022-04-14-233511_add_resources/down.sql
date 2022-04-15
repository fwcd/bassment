-- Remove resource table and associated columns

ALTER TABLE artists
    DROP COLUMN cover_art_id;

ALTER TABLE albums
    DROP COLUMN cover_art_id;

DROP TABLE track_audios;
DROP TABLE resources;
