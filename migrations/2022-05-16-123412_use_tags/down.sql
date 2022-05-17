-- Migrate back to the existing tables of artists etc.

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE track_genres (
    track_id INT REFERENCES tracks(id),
    genre_id INT REFERENCES genres(id),
    CONSTRAINT track_genres_pkey PRIMARY KEY (track_id, genre_id)
);

-- Migrate genres

INSERT INTO genres (name, description)
    SELECT value, tags.description
    FROM tags
        JOIN categories ON (category_id = categories.id)
    WHERE key = 'genre';

INSERT INTO track_genres (track_id, genre_id)
    SELECT track_id, genres.id
    FROM track_tags
        JOIN tags ON (category_id = 1 AND tag_id = tags.id)
        JOIN genres ON (genres.name = tags.value);

-- Delete old tables.

DROP TABLE track_tags;
DROP TABLE tags;
DROP TABLE categories;
