DO $$
DECLARE queen_id INTEGER;
DECLARE elvis_id INTEGER;
DECLARE beatles_id INTEGER;
DECLARE news_of_the_world_id INTEGER;
DECLARE the_game_id INTEGER;
DECLARE abbey_road_id INTEGER;
DECLARE come_together_id INTEGER;
DECLARE jailhouse_rock_id INTEGER;
DECLARE we_will_rock_you_id INTEGER;
DECLARE another_one_bites_the_dust_id INTEGER;
DECLARE rock_id INTEGER;
DECLARE stuff_id INTEGER;
DECLARE set_logs_id INTEGER;
DECLARE rock_n_roll_crate_id INTEGER;
DECLARE rock_playlist_id INTEGER;
BEGIN
    -- Add artists.
    INSERT INTO artists (name) VALUES ('Queen') RETURNING id INTO queen_id;
    INSERT INTO artists (name) VALUES ('Elvis Presley') RETURNING id INTO elvis_id;
    INSERT INTO artists (name) VALUES ('The Beatles') RETURNING id INTO beatles_id;

    -- Add albums.
    INSERT INTO albums (name) VALUES ('Abbey Road') RETURNING id INTO abbey_road_id;
    INSERT INTO albums (name) VALUES ('News of the World') RETURNING id INTO news_of_the_world_id;
    INSERT INTO albums (name) VALUES ('The Game') RETURNING id INTO the_game_id;
    INSERT INTO album_artists (album_id, artist_id) VALUES (abbey_road_id, beatles_id);
    INSERT INTO album_artists (album_id, artist_id) VALUES (news_of_the_world_id, queen_id);
    INSERT INTO album_artists (album_id, artist_id) VALUES (the_game_id, queen_id);

    -- Add genres.
    INSERT INTO tags (category_id, value) VALUES (1, 'Rock') RETURNING id INTO rock_id;

    -- Add tracks.
    INSERT INTO tracks (title) VALUES ('Come Together') RETURNING id INTO come_together_id;
    INSERT INTO tracks (title) VALUES ('Jailhouse Rock') RETURNING id INTO jailhouse_rock_id;
    INSERT INTO tracks (title) VALUES ('We Will Rock You') RETURNING id INTO we_will_rock_you_id;
    INSERT INTO tracks (title) VALUES ('Another One Bites The Dust') RETURNING id INTO another_one_bites_the_dust_id;

    -- Add track associations.
    INSERT INTO track_artists (track_id, artist_id) VALUES (come_together_id, beatles_id);
    INSERT INTO track_artists (track_id, artist_id) VALUES (jailhouse_rock_id, elvis_id);
    INSERT INTO track_artists (track_id, artist_id) VALUES (we_will_rock_you_id, queen_id);
    INSERT INTO track_artists (track_id, artist_id) VALUES (another_one_bites_the_dust_id, queen_id);
    INSERT INTO track_tags (track_id, tag_id) VALUES (jailhouse_rock_id, rock_id);
    INSERT INTO track_tags (track_id, tag_id) VALUES (we_will_rock_you_id, rock_id);
    INSERT INTO track_tags (track_id, tag_id) VALUES (another_one_bites_the_dust_id, rock_id);

    -- Add playlists.
    INSERT INTO playlists (name, kind, position) VALUES ('Stuff', 'folder', 1) RETURNING id INTO stuff_id;
    INSERT INTO playlists (name, kind, position, parent_id) VALUES ('50s', 'crate', 1, stuff_id) RETURNING id INTO rock_n_roll_crate_id;
    INSERT INTO playlists (name, position) VALUES ('Rock', 3) RETURNING id INTO rock_playlist_id;
    INSERT INTO playlists (name, position) VALUES ('Pop', 2);
    INSERT INTO playlists (name, kind, position, parent_id) VALUES ('80s', 'crate', 2, stuff_id);
    INSERT INTO playlists (name, kind, position) VALUES ('Set Logs', 'folder', 4) RETURNING id INTO set_logs_id;
    INSERT INTO playlists (name, kind, position, parent_id) VALUES ('2022-01-01', 'set_log', 1, set_logs_id);
    INSERT INTO playlists (name, kind, position, parent_id) VALUES ('2022-02-04', 'set_log', 2, set_logs_id);
    INSERT INTO playlists (name, kind, position, parent_id) VALUES ('2022-02-05', 'set_log', 3, set_logs_id);
    INSERT INTO playlists (name, kind, position, parent_id) VALUES ('2022-02-05', 'set_log', 4, set_logs_id);
    INSERT INTO playlist_tracks (playlist_id, track_id) VALUES (rock_n_roll_crate_id, jailhouse_rock_id);
    INSERT INTO playlist_tracks (playlist_id, track_id, track_number) VALUES (rock_playlist_id, another_one_bites_the_dust_id, 1);
    INSERT INTO playlist_tracks (playlist_id, track_id, track_number) VALUES (rock_playlist_id, jailhouse_rock_id, 2);
    INSERT INTO playlist_tracks (playlist_id, track_id, track_number) VALUES (rock_playlist_id, we_will_rock_you_id, 3);

    -- TODO: Insert only if none with same name exists? Unique constraint?
END $$;
