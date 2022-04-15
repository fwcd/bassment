use diesel::RunQueryDsl;

use crate::{models::{Claim, TokenSecret}, db::DbConn, error::Result};

/// Fetches the secret from the database.
fn secret(conn: &DbConn) -> Result<Vec<u8>> {
    use crate::schema::token_secret::dsl::*;

    let row: TokenSecret = token_secret.get_result(conn)?;
    Ok(row.secret)
}

/// Encodes/issues a new token.
pub fn encode(claim: Claim) -> String {
    // TODO
    todo!()
}

/// Decodes/validates the given token. Errors if the token is invalid/malformed.
pub fn decode(claim: Claim, conn: &DbConn) -> Result<Claim> {
    // TODO
    todo!()
}
