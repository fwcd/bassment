use chrono::{Duration, Utc, DateTime, TimeZone};
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

impl Claims {
    /// Creates a new payload expiring in the given duration for the given username.
    pub fn new(expires_in: Duration, username: &str) -> Self {
        Self {
            exp: (Utc::now() + expires_in).timestamp() as usize,
            sub: username.to_owned(),
        }
    }

    /// Fetches the expiry DateTime.
    pub fn expiry(&self) -> DateTime<Utc> { Utc.timestamp(self.exp as i64, 0) }

    /// Fetches the username in question.
    pub fn username(&self) -> &str { &self.sub }
}
