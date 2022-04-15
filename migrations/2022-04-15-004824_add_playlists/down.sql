-- Drop crates and playlists.

SELECT unmanage_last_modified('playlists');

DROP TABLE playlist_tracks;
DROP TABLE playlists;
