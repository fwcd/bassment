-- Add description columns to various tables.

ALTER TABLE albums ADD COLUMN description TEXT;
ALTER TABLE artists ADD COLUMN description TEXT;
ALTER TABLE genres ADD COLUMN description TEXT;
ALTER TABLE playlists ADD COLUMN description TEXT;
