use diesel::RunQueryDsl;

use crate::db::DbConn;
use crate::error::Result;
use crate::models::{Settings, UpdateSettings};
use crate::schema::settings::dsl::*;

/// Fetches the application settings.
pub fn get(conn: &DbConn) -> Result<Settings> {
    Ok(settings.get_result(conn)?)
}

/// Updates the application settings.
pub fn update(update_settings: &UpdateSettings, conn: &DbConn) -> Result<Settings> {
    Ok(diesel::update(settings)
        .set(update_settings)
        .get_result(conn)?)
}
