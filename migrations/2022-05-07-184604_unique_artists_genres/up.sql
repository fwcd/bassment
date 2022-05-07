-- Make artists and genres unique by name.

ALTER TABLE artists ADD CONSTRAINT unique_artist_name UNIQUE (name);
ALTER TABLE genres ADD CONSTRAINT unique_genre_name UNIQUE (name);
