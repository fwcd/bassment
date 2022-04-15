-- Add crates and playlists.

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT DEFAULT 'New Playlist' NOT NULL,
    kind INT DEFAULT 0 NOT NULL, -- 0 => default,
                                 -- 1 => folder,
                                 -- 2 => crate,
                                 -- 3 => set log
    cover_art_id INT REFERENCES resources(id),
    parent_id INT REFERENCES playlists(id),
    position INT NOT NULL, -- starts from 0, indexed within the parent folder
                           -- (i.e. the first child is always 0)
    last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE playlist_tracks (
    playlist_id INT REFERENCES playlists(id),
    track_id INT REFERENCES tracks(id),
    track_number INT,
    CONSTRAINT playlist_track_pkey PRIMARY KEY (playlist_id, track_id)
);

SELECT manage_last_modified('playlists');
