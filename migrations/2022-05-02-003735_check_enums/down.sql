-- Revert enum checking.

CREATE FUNCTION pg_temp.cue_kind_to_int(old_kind cue_kind) RETURNS INT AS $$
BEGIN
    -- Using https://github.com/fwcd/mixync/blob/ef74bf59/mixync/model/cue_type.py
    RETURN CASE
        WHEN old_kind = 'hot_cue' THEN 1
        WHEN old_kind = 'main_cue' THEN 2
        WHEN old_kind = 'loop' THEN 4
        WHEN old_kind = 'jump' THEN 5
        WHEN old_kind = 'intro' THEN 6
        WHEN old_kind = 'outro' THEN 7
        ELSE 0
    END;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION pg_temp.file_kind_to_int(old_kind file_kind) RETURNS INT AS $$
BEGIN
    RETURN CASE
        WHEN old_kind = 'audio' THEN 1
        WHEN old_kind = 'cover_art' THEN 2
        ELSE NULL
    END;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION pg_temp.playlist_kind_to_int(old_kind playlist_kind) RETURNS INT AS $$
BEGIN
    RETURN CASE
        WHEN old_kind = 'playlist' THEN 0
        WHEN old_kind = 'folder' THEN 1
        WHEN old_kind = 'crate' THEN 2
        WHEN old_kind = 'set_log' THEN 3
        ELSE 0
    END;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE playlists
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind TYPE INT USING pg_temp.playlist_kind_to_int(kind),
    ALTER COLUMN kind SET DEFAULT 0,
    ALTER COLUMN kind SET NOT NULL;

ALTER TABLE file_locations
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind TYPE INT USING pg_temp.file_kind_to_int(kind),
    ALTER COLUMN kind DROP NOT NULL;

ALTER TABLE cues
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind TYPE INT USING pg_temp.cue_kind_to_int(kind),
    ALTER COLUMN kind SET DEFAULT 0,
    ALTER COLUMN kind SET NOT NULL;

DROP FUNCTION pg_temp.playlist_kind_to_int;
DROP FUNCTION pg_temp.file_kind_to_int;
DROP FUNCTION pg_temp.cue_kind_to_int;

DROP TYPE playlist_kind;
DROP TYPE file_kind;
DROP TYPE cue_kind;
