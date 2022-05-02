-- Revert enum checking.

ALTER TABLE playlist_kind
    ALTER COLUMN kind TYPE INT,
    ALTER COLUMN kind SET DEFAULT 0,
    ALTER COLUMN kind SET NOT NULL;

ALTER TABLE file_locations
    ALTER COLUMN kind TYPE INT,
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind DROP NOT NULL;

ALTER TABLE cues
    ALTER COLUMN kind TYPE INT,
    ALTER COLUMN kind SET DEFAULT 0,
    ALTER COLUMN kind SET NOT NULL;

DROP TYPE playlist_kind;
DROP TYPE file_kind;
DROP TYPE cue_kind;
