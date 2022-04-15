use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Login {
    pub username: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct Signup {
    pub username: String,
    pub password: String,
}

/// The secret for generating JWT tokens.
#[derive(Clone, Queryable)]
pub struct TokenSecret {
    pub id: bool,
    pub secret: Vec<u8>,
}

/// The JWT payload.
#[derive(Serialize, Deserialize)]
pub struct Claims {
    /// Expiration UTC timestamp.
    pub exp: usize,
    /// Subject (in our case the username).
    pub sub: String,
}
