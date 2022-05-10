use std::{io, fmt};

use actix_multipart::MultipartError;
use actix_web::{ResponseError, HttpResponse, http::StatusCode, error::BlockingError};
use serde::{Serialize, Deserialize};

/// The general error type used by Bassment.
#[derive(Debug, Serialize, Deserialize)]
pub enum Error {
    Internal(String),
    NotFound(String),
    BadRequest(String),
    Unauthorized(String),
    Conflict(String),
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Internal(_) => write!(f, "Internal error"),
            Self::NotFound(_) => write!(f, "Not found"),
            Self::BadRequest(_) => write!(f, "Bad request"),
            Self::Unauthorized(_) => write!(f, "Unauthorized"),
            Self::Conflict(_) => write!(f, "Conflict"),
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
    fn from(e: jsonwebtoken::errors::Error) -> Self { Self::Unauthorized(format!("JWT error: {:?}", e)) }
}

impl From<bcrypt::BcryptError> for Error {
    fn from(e: bcrypt::BcryptError) -> Self { Self::Internal(format!("Bcrypt error: {:?}", e)) }
}

impl From<BlockingError> for Error {
    fn from(e: BlockingError) -> Self { Self::Internal(format!("Blocking error: {:?}", e)) }
}

impl From<MultipartError> for Error {
    fn from(e: MultipartError) -> Self { Self::Internal(format!("Multipart error: {:?}", e)) }
}

impl From<serde_json::Error> for Error {
    fn from(e: serde_json::Error) -> Self { Self::Internal(format!("JSON serialization error: {:?}", e)) }
}

impl From<id3::Error> for Error {
    fn from(e: id3::Error) -> Self { Self::Internal(format!("ID3 error: {:?}", e)) }
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
            Self::NotFound(_) => StatusCode::NOT_FOUND,
            Self::BadRequest(_) => StatusCode::BAD_REQUEST,
            Self::Unauthorized(_) => StatusCode::UNAUTHORIZED,
            Self::Conflict(_) => StatusCode::CONFLICT,
        }
    }
}

/// The general result type used by Bassment.
pub type Result<T> = std::result::Result<T, Error>;
