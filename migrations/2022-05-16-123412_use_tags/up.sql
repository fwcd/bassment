-- Create tag tables.

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    predefined BOOLEAN NOT NULL DEFAULT FALSE,
    hidden BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories(id),
    value TEXT NOT NULL,
    description TEXT,
    cover_art_id INT REFERENCES file_infos(id),
    last_modified_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT tags_unique UNIQUE (category_id, value)
);

CREATE TABLE track_tags (
    track_id INT REFERENCES tracks(id),
    tag_id INT REFERENCES tags(id),
    CONSTRAINT track_tags_pkey PRIMARY KEY (track_id, tag_id)
);

INSERT INTO categories (id, key, display_name, predefined) VALUES (1, 'genre', 'Genre', TRUE);
INSERT INTO categories (id, key, display_name, predefined) VALUES (2, 'mood', 'Mood', TRUE);

-- Migrate genres

INSERT INTO tags (category_id, value, description)
    SELECT 1, name, description
    FROM genres;

INSERT INTO track_tags (track_id, tag_id)
    SELECT track_id, tags.id
    FROM track_genres
        JOIN genres ON (genre_id = genres.id)
        JOIN tags ON (tags.category_id = 1 AND value = genres.name);

DROP TABLE track_genres;
DROP TABLE genres;
