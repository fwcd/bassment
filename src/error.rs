use std::{io, fmt};

use actix_web::{ResponseError, HttpResponse, http::StatusCode};

/// The general error type used by Bassment.
#[derive(Debug)]
pub enum Error {
    Internal(String),
    BadRequest(String),
    Unauthorized,
}

impl Error {
    pub fn internal(s: &str) -> Self { Self::Internal(s.to_owned()) }

    pub fn bad_request(s: &str) -> Self { Self::BadRequest(s.to_owned()) }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Internal(_) => write!(f, "Internal error"),
            Self::BadRequest(_) => write!(f, "Bad request"),
            Self::Unauthorized => write!(f, "Unauthorized"),
        }
    }
}

impl From<r2d2::Error> for Error {
    fn from(e: r2d2::Error) -> Self { Self::Internal(format!("R2D2 error: {:?}", e)) }
}

impl From<io::Error> for Error {
    fn from(e: io::Error) -> Self { Self::Internal(format!("IO error: {:?}", e)) }
}

impl From<diesel::result::Error> for Error {
    fn from(e: diesel::result::Error) -> Self { Self::Internal(format!("Diesel error: {:?}", e)) }
}

impl From<jsonwebtoken::errors::Error> for Error {
    fn from(e: jsonwebtoken::errors::Error) -> Self { Self::Internal(format!("JWT error: {:?}", e)) }
}

impl From<bcrypt::BcryptError> for Error {
    fn from(e: bcrypt::BcryptError) -> Self { Self::Internal(format!("Bcrypt error: {:?}", e)) }
}

impl From<String> for Error {
    fn from(s: String) -> Self { Self::Internal(s) }
}

impl ResponseError for Error {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
            .body(self.to_string())
    }

    fn status_code(&self) -> actix_web::http::StatusCode {
        match self {
            Self::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Self::BadRequest(_) => StatusCode::BAD_REQUEST,
            Self::Unauthorized => StatusCode::UNAUTHORIZED,
        }
    }
}

/// The general result type used by Bassment.
pub type Result<T> = std::result::Result<T, Error>;
