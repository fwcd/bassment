use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Playlist, NewPlaylist, UpdatePlaylist, PlaylistTreeNode, AnnotatedTrack}, error::Result, db::DbConn, actions::tracks};

/// Fetches all playlists from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Playlist>> {
    use crate::schema::playlists::dsl::*;
    let mut fetched = playlists.get_results(conn)?;
    fetched.sort_by_key(|p: &Playlist| p.position);
    Ok(fetched)
}

/// Looks up a playlist by id.
pub fn by_id(playlist_id: i32, conn: &DbConn) -> Result<Option<Playlist>> {
    use crate::schema::playlists::dsl::*;
    Ok(playlists.filter(id.eq(playlist_id)).get_result(conn).optional()?)
}

/// Fetches a playlist tree for a playlist.
fn tree_for(playlist: Playlist, conn: &DbConn) -> Result<PlaylistTreeNode> {
    use crate::schema::playlists::dsl::*;
    let mut fetched = playlists
        .filter(parent_id.eq(playlist.id))
        .get_results(conn)?;
    fetched.sort_by_key(|p: &Playlist| p.position);
    let children = fetched
        .into_iter()
        .map(|p| tree_for(p, conn))
        .collect::<Result<Vec<_>>>()?;
    Ok(PlaylistTreeNode { playlist, children })
}

/// Fetches a playlist tree by id.
pub fn tree_by_id(playlist_id: i32, conn: &DbConn) -> Result<Option<PlaylistTreeNode>> {
    if let Some(playlist) = by_id(playlist_id, conn)? {
        Ok(Some(tree_for(playlist, conn)?))
    } else {
        Ok(None)
    }
}

/// Fetches all playlist trees from the database.
pub fn all_trees(conn: &DbConn) -> Result<Vec<PlaylistTreeNode>> {
    use crate::schema::playlists::dsl::*;
    let mut fetched = playlists
        .filter(parent_id.is_null())
        .get_results(conn)?;
    fetched.sort_by_key(|p: &Playlist| p.position);
    fetched
        .into_iter()
        .map(|p| tree_for(p, conn))
        .collect::<Result<Vec<_>>>()
}

/// Fetches annotated tracks for a playlist by id.
pub fn annotated_tracks_by_id(playlist_id: i32, conn: &DbConn) -> Result<Vec<AnnotatedTrack>> {
    use crate::schema::playlist_tracks;
    let track_ids = playlist_tracks::table.select(playlist_tracks::track_id)
        .filter(playlist_tracks::playlist_id.eq(playlist_id))
        .get_results(conn)?;
    tracks::annotated_by_ids(&track_ids, conn)
}

/// Inserts a playlist into the database.
pub fn insert(new_playlist: &NewPlaylist, conn: &DbConn) -> Result<Playlist> {
    use crate::schema::playlists::dsl::*;
    Ok(diesel::insert_into(playlists)
        .values(new_playlist)
        .get_result(conn)?)
}

/// Updates a playlist in the database.
pub fn update(playlist_id: i32, update_playlist: &UpdatePlaylist, conn: &DbConn) -> Result<Playlist> {
    use crate::schema::playlists::dsl::*;
    Ok(diesel::update(playlists)
        .filter(id.eq(playlist_id))
        .set(update_playlist)
        .get_result(conn)?)
}
