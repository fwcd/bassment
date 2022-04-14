-- Remove resource table and associated columns

ALTER TABLE artist
    DROP COLUMN cover_art_id;

ALTER TABLE album
    DROP COLUMN cover_art_id;

DROP TABLE track_audio;
DROP TABLE resource;
