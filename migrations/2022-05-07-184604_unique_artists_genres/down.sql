-- Remove the uniqueness constraints from artists and genres.

ALTER TABLE artists DROP CONSTRAINT unique_artist_name;
ALTER TABLE genres DROP CONSTRAINT unique_genre_name;
