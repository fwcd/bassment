-- Check enums using PostgreSQL's enums.

CREATE TYPE cue_kind AS ENUM('hot_cue', 'main_cue', 'loop', 'jump', 'intro', 'outro');
CREATE TYPE file_kind AS ENUM('generic', 'audio', 'cover_art');
CREATE TYPE playlist_kind AS ENUM('playlist', 'folder', 'crate', 'set_log');

ALTER TABLE cues
    ALTER COLUMN kind TYPE cue_kind,
    ALTER COLUMN kind SET DEFAULT 'hot_cue',
    ALTER COLUMN kind SET NOT NULL;

ALTER TABLE file_locations
    ALTER COLUMN kind TYPE file_kind,
    ALTER COLUMN kind SET DEFAULT 'generic',
    ALTER COLUMN kind SET NOT NULL;

ALTER TABLE playlist_kind
    ALTER COLUMN kind TYPE playlist_kind,
    ALTER COLUMN kind SET DEFAULT 'playlist',
    ALTER COLUMN kind SET NOT NULL;

