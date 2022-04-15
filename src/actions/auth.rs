use diesel::RunQueryDsl;
use jsonwebtoken::{Header, EncodingKey, DecodingKey, Validation};

use crate::{models::{Claims, TokenSecret}, db::DbConn, error::Result};

/// Fetches the secret from the database.
fn secret(conn: &DbConn) -> Result<Vec<u8>> {
    use crate::schema::token_secret::dsl::*;

    let row: TokenSecret = token_secret.get_result(conn)?;
    Ok(row.secret)
}

/// Encodes/issues a new token.
pub fn encode(claims: Claims, conn: &DbConn) -> Result<String> {
    Ok(jsonwebtoken::encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(&secret(conn)?),
    )?)
}

/// Decodes/validates the given token. Errors if the token is invalid/malformed.
pub fn decode(token: &str, conn: &DbConn) -> Result<Claims> {
    Ok(jsonwebtoken::decode(
        token,
        &DecodingKey::from_secret(&secret(conn)?),
        &Validation::default(),
    )?.claims)
}
