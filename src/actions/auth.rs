use crate::{models::Claim, db::DbConn, error::Result};

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
