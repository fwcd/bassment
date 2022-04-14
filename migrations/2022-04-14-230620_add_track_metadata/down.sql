-- Remove track metadata columns

ALTER TABLE track
    DROP COLUMN year,
    DROP COLUMN comment,
    DROP COLUMN duration_ms,
    DROP COLUMN sample_rate,
    DROP COLUMN channels,
    DROP COLUMN bpm,
    DROP COLUMN times_played,
    DROP COLUMN rating,
    DROP COLUMN key,
    DROP COLUMN color,
    DROP COLUMN added_at,
    DROP COLUMN last_modified_at,
    DROP COLUMN last_played_at;

DROP TABLE track_genre;
DROP TABLE track_album;
DROP TABLE genre;
