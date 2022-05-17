-- Uncascades playlist deletions.

ALTER TABLE playlists
    DROP CONSTRAINT playlists_parent_id_fkey,
    ADD CONSTRAINT playlists_parent_id_fkey
        FOREIGN KEY (parent_id) REFERENCES playlists(id);

ALTER TABLE playlist_tracks
    DROP CONSTRAINT playlist_tracks_playlist_id_fkey,
    ADD CONSTRAINT playlist_tracks_playlist_id_fkey
        FOREIGN KEY (playlist_id) REFERENCES playlists(id)
        ON DELETE CASCADE;
