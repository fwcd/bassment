-- Add crates and playlists.

CREATE TABLE playlist (
    id SERIAL PRIMARY KEY,
    name TEXT DEFAULT 'New Playlist' NOT NULL,
    kind INT DEFAULT 0 NOT NULL, -- 0 => default,
                                 -- 1 => folder,
                                 -- 2 => set log
    cover_art_id INT REFERENCES resource(id),
    parent_id INT REFERENCES playlist(id)
);

CREATE TABLE crate (
    id SERIAL PRIMARY KEY,
    name TEXT DEFAULT 'New Crate' NOT NULL,
    kind INT DEFAULT 0 NOT NULL, -- 0 => default,
                                 -- 1 => folder
    cover_art_id INT REFERENCES resource(id),
    parent_id INT REFERENCES crate(id)
);

CREATE TABLE playlist_track (
    playlist_id INT REFERENCES playlist(id),
    track_id INT REFERENCES track(id),
    track_number INT,
    CONSTRAINT playlist_track_pkey PRIMARY KEY (playlist_id, track_id, track_number)
);

CREATE TABLE crate_track (
    crate_id INT REFERENCES crate(id),
    track_id INT REFERENCES track(id),
    CONSTRAINT crate_track_pkey PRIMARY KEY (crate_id, track_id)
);
