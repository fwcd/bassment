use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Login {
    username: String,
    password: String,
}

#[derive(Deserialize)]
pub struct Signup {
    username: String,
    password: String,
}

/// The JWT payload.
#[derive(Serialize, Deserialize)]
pub struct Claim {
    /// Expiration UTC timestamp.
    exp: usize,
    /// Subject (in our case the username).
    sub: String,
}
