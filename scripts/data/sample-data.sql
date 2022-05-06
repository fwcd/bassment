DO $$
DECLARE beatles_id integer;
DECLARE abbey_road_id integer;
BEGIN
    INSERT INTO artists (name) VALUES ('Queen');
    INSERT INTO artists (name) VALUES ('Elvis Presley');
    INSERT INTO artists (name) VALUES ('The Beatles') RETURNING id INTO beatles_id;

    INSERT INTO albums (name) VALUES ('Abbey Road') RETURNING id INTO abbey_road_id;
    INSERT INTO album_artists (album_id, artist_id) VALUES (abbey_road_id, beatles_id);

    -- TODO: Insert only if none with same name exists? Unique constraint?
    -- TODO: Playlists, ideally nested ones
END $$;
