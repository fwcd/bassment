-- Create tag tables.

CREATE TABLE tag_categories (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    predefined BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES tag_categories(id),
    value TEXT NOT NULL,
    description TEXT,
    cover_art_id INT REFERENCES file_infos(id),
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE track_tags (
    track_id INT REFERENCES tracks(id),
    tag_id INT REFERENCES tags(id),
    CONSTRAINT track_tags_pkey PRIMARY KEY (track_id, tag_id)
);

INSERT INTO tag_categories (id, key, display_name, predefined) VALUES (1, 'artist', 'Artist', TRUE);
INSERT INTO tag_categories (id, key, display_name, predefined) VALUES (2, 'album', 'Album', TRUE);
INSERT INTO tag_categories (id, key, display_name, predefined) VALUES (3, 'crate', 'Crate', TRUE);
INSERT INTO tag_categories (id, key, display_name, predefined) VALUES (4, 'genre', 'Genre', TRUE);
INSERT INTO tag_categories (id, key, display_name, predefined) VALUES (5, 'mood', 'Mood', TRUE);

-- Migrate artists, albums, crates and genres

INSERT INTO tags (category_id, value, description, cover_art_id)
    SELECT 1, name, description, cover_art_id
    FROM artists;

INSERT INTO tags (category_id, value, description, cover_art_id)
    SELECT 2, name, description, cover_art_id
    FROM albums;

INSERT INTO tags (category_id, value, description, cover_art_id)
    SELECT 3, name, description, cover_art_id
    FROM playlists
    WHERE kind = 'crate';

INSERT INTO tags (category_id, value, description)
    SELECT 4, name, description
    FROM genres;

-- Migrate associations.

INSERT INTO track_tags (track_id, tag_id)
    SELECT track_id, tags.id
    FROM track_artists
        JOIN artists ON (artist_id = artists.id)
        JOIN tags ON (tags.category_id = 1 AND value = artists.name);

INSERT INTO track_tags (track_id, tag_id)
    SELECT track_id, tags.id
    FROM track_albums
        JOIN albums ON (album_id = albums.id)
        JOIN tags ON (tags.category_id = 2 AND value = albums.name);

INSERT INTO track_tags (track_id, tag_id)
    SELECT track_id, tags.id
    FROM playlist_tracks
        JOIN playlists ON (playlist_id = playlists.id)
        JOIN tags ON (tags.category_id = 3 AND value = playlists.name);

INSERT INTO track_tags (track_id, tag_id)
    SELECT track_id, tags.id
    FROM track_genres
        JOIN genres ON (genre_id = genres.id)
        JOIN tags ON (tags.category_id = 4 AND value = genres.name);

-- Delete crates from playlists.

DELETE FROM playlist_tracks
    USING playlists
    WHERE playlist_id = playlists.id AND kind = 'crate';

DELETE FROM playlists
    WHERE kind = 'crate';

-- Remove 'crate' enum case.

ALTER TYPE playlist_kind RENAME TO playlist_kind_old;
CREATE TYPE playlist_kind AS ENUM('playlist', 'folder', 'set_log');

CREATE FUNCTION pg_temp.migrate_playlist_kind(old_kind playlist_kind_old) RETURNS playlist_kind AS $$
BEGIN
    RETURN CASE
        WHEN old_kind = 'folder' THEN 'folder'
        WHEN old_kind = 'set_log' THEN 'set_log'
        ELSE 'playlist'
    END;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE playlists
    ALTER COLUMN kind DROP DEFAULT,
    ALTER COLUMN kind TYPE playlist_kind USING pg_temp.migrate_playlist_kind(kind),
    ALTER COLUMN kind SET DEFAULT 'playlist';

DROP TYPE playlist_kind_old CASCADE;

-- Delete old tables.

DROP TABLE track_artists;
DROP TABLE track_albums;
DROP TABLE track_genres;
DROP TABLE album_artists;

DROP TABLE artists;
DROP TABLE albums;
DROP TABLE genres;
