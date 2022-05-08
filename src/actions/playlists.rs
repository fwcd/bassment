use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{Playlist, NewPlaylist, UpdatePlaylist, PlaylistTreeNode}, error::Result, db::DbConn};
use crate::schema::playlists::dsl::*;

/// Fetches all playlists from the database.
pub fn all(conn: &DbConn) -> Result<Vec<Playlist>> {
    let mut fetched = playlists.get_results(conn)?;
    fetched.sort_by_key(|p: &Playlist| p.position);
    Ok(fetched)
}

/// Looks up a playlist by id.
pub fn by_id(playlist_id: i32, conn: &DbConn) -> Result<Option<Playlist>> {
    Ok(playlists.filter(id.eq(playlist_id)).get_result(conn).optional()?)
}

/// Fetches a playlist tree for a playlist.
fn tree_for(playlist: Playlist, conn: &DbConn) -> Result<PlaylistTreeNode> {
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
    let mut fetched = playlists
        .filter(parent_id.is_null())
        .get_results(conn)?;
    fetched.sort_by_key(|p: &Playlist| p.position);
    fetched
        .into_iter()
        .map(|p| tree_for(p, conn))
        .collect::<Result<Vec<_>>>()
}

/// Inserts a playlist into the database.
pub fn insert(new_playlist: &NewPlaylist, conn: &DbConn) -> Result<Playlist> {
    Ok(diesel::insert_into(playlists)
        .values(new_playlist)
        .get_result(conn)?)
}

/// Updates a playlist in the database.
pub fn update(playlist_id: i32, update_playlist: &UpdatePlaylist, conn: &DbConn) -> Result<Playlist> {
    Ok(diesel::update(playlists)
        .filter(id.eq(playlist_id))
        .set(update_playlist)
        .get_result(conn)?)
}
