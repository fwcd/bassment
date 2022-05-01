-- Remove description columns from various tables.

ALTER TABLE playlists DROP COLUMN description;
ALTER TABLE genres DROP COLUMN description;
ALTER TABLE artists DROP COLUMN description;
ALTER TABLE albums DROP COLUMN description;
