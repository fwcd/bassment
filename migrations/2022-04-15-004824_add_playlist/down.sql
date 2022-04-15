-- Drop crates and playlists.

SELECT unmanage_last_modified('playlist');

DROP TABLE playlist_track;
DROP TABLE playlist;
