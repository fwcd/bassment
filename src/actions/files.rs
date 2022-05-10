use std::{path::PathBuf, fs, io};

use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, OptionalExtension};

use crate::{models::{FileInfo, NewFileInfo, UpdateFileInfo}, error::{Result, Error}, db::DbConn, utils::sanitize::sanitize};

use super::settings;

/// Fetches all file infos from the database.
pub fn all(conn: &DbConn) -> Result<Vec<FileInfo>> {
    use crate::schema::file_infos::dsl::*;
    Ok(file_infos.get_results(conn)?)
}

/// Looks up a file info by id.
pub fn by_id(file_id: i32, conn: &DbConn) -> Result<Option<FileInfo>> {
    use crate::schema::file_infos::dsl::*;
    Ok(file_infos.filter(id.eq(file_id)).get_result(conn).optional()?)
}

/// Inserts a file info into the database.
fn insert(mut new_info: NewFileInfo, conn: &DbConn) -> Result<FileInfo> {
    use crate::schema::file_infos::dsl::*;
    new_info.name = sanitize(&new_info.name);
    Ok(diesel::insert_into(file_infos)
        .values(new_info)
        .get_result(conn)?)
}

/// Updates a file info in the database.
fn update(file_id: i32, mut update_info: UpdateFileInfo, conn: &DbConn) -> Result<FileInfo> {
    use crate::schema::file_infos::dsl::*;
    update_info.name = update_info.name.map(|n| sanitize(&n));
    Ok(diesel::update(file_infos)
        .filter(id.eq(file_id))
        .set(update_info)
        .get_result(conn)?)
}

fn path_for(info: &FileInfo, conn: &DbConn) -> Result<PathBuf> {
    let base_dir = settings::get(&conn)?.file_storage_base_directory;
    return Ok(PathBuf::from(format!("{}/{}/{}", base_dir, info.id, info.name)));
}

/// Updates a file info along with the file on the file system.
pub fn update_with_file(file_id: i32, update_info: UpdateFileInfo, conn: &DbConn) -> Result<FileInfo> {
    // Update info in db
    let old_info = by_id(file_id, conn)?;
    let new_info = update(file_id, update_info, conn)?;
    // Move file if needed
    if let Some(old_info) = old_info {
        let old_path = path_for(&old_info, &conn)?;
        let new_path = path_for(&new_info, &conn)?;
        if old_path != new_path && old_path.exists() {
            fs::rename(old_path, new_path)?;
        }
    }
    Ok(new_info)
}

/// Fetches a file's media type and data by id.
pub fn data_by_id(file_id: i32, conn: &DbConn) -> Result<(String, Vec<u8>)> {
    // Find info in db
    let info = by_id(file_id, conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", file_id)))?;
    // Read the actual file
    let path = path_for(&info, conn)?;
    let data = fs::read(&path).map_err(|e| match e.kind() {
        io::ErrorKind::NotFound => Error::NotFound(format!("Could not find file at {}", path.display())),
        _ => e.into(),
    })?;
    Ok((info.media_type, data))
}

/// Uploads file data given a file info.
pub fn update_data_for(info: &FileInfo, data: &[u8], conn: &DbConn) -> Result<()> {
    let path = path_for(&info, conn)?;
    let parent = path.parent().ok_or_else(|| Error::Internal(format!("No parent path")))?;
    fs::create_dir_all(parent)?;
    fs::write(path, &data)?;
    Ok(())
}

/// Uploads file data by id.
pub fn update_data_by_id(file_id: i32, data: &[u8], conn: &DbConn) -> Result<()> {
    // Find info in db
    let info = by_id(file_id, conn)?.ok_or_else(|| Error::NotFound(format!("Could not find file with id {}", file_id)))?;
    // Write the actual file + parent dirs
    update_data_for(&info, data, conn)
}

/// Inserts file info into the database and writes data to the file system.
pub fn insert_with_file(info: NewFileInfo, data: &[u8], conn: &DbConn) -> Result<()> {
    let info = insert(info, conn)?;
    update_data_for(&info, data, conn)
}
