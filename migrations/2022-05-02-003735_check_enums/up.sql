-- Check enums using PostgreSQL's enums.

CREATE TYPE cue_kind AS ENUM('hot_cue', 'main_cue', 'loop', 'jump', 'intro', 'outro');
CREATE TYPE file_kind AS ENUM('generic', 'audio', 'cover_art');
CREATE TYPE playlist_kind AS ENUM('playlist', 'folder', 'crate', 'set_log');

CREATE FUNCTION pg_temp.int_to_cue_kind(old_kind INT) RETURNS cue_kind AS $$
BEGIN
    -- Using https://github.com/fwcd/mixync/blob/ef74bf59/mixync/model/cue_type.py
    RETURN CASE
        WHEN old_kind = 1 THEN 'hot_cue'
        WHEN old_kind = 2 THEN 'main_cue'
        WHEN old_kind = 4 THEN 'loop'
        WHEN old_kind = 5 THEN 'jump'
        WHEN old_kind = 6 THEN 'intro'
        WHEN old_kind = 7 THEN 'outro'
        ELSE 'hoe_cue'
    END;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION pg_temp.int_to_file_kind(old_kind INT) RETURNS file_kind AS $$
BEGIN
    RETURN CASE
        WHEN old_kind = 1 THEN 'audio'
        WHEN old_kind = 2 THEN 'cover_art'
        ELSE 'generic'
    END;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION pg_temp.int_to_playlist_kind(old_kind INT) RETURNS playlist_kind AS $$
BEGIN
    RETURN CASE
        WHEN old_kind = 0 THEN 'playlist'
        WHEN old_kind = 1 THEN 'folder'
        WHEN old_kind = 2 THEN 'crate'
        WHEN old_kind = 3 THEN 'set_log'
        ELSE 'playlist'
    END;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE cues
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind TYPE cue_kind USING pg_temp.int_to_cue_kind(kind),
    ALTER COLUMN kind SET DEFAULT 'hot_cue',
    ALTER COLUMN kind SET NOT NULL;

ALTER TABLE file_locations
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind TYPE file_kind USING pg_temp.int_to_file_kind(kind),
    ALTER COLUMN kind SET DEFAULT 'generic',
    ALTER COLUMN kind SET NOT NULL;

ALTER TABLE playlists
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind TYPE playlist_kind USING pg_temp.int_to_playlist_kind(kind),
    ALTER COLUMN kind SET DEFAULT 'playlist',
    ALTER COLUMN kind SET NOT NULL;

