use actix_web::{dev::ServiceRequest, web};
use actix_web_httpauth::{extractors::bearer::BearerAuth};

use crate::{db::DbPool, error::Error, actions::auth};

/// Validates a token from the given credentials.
pub async fn validate_token(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, actix_web::Error> {
    let pool = req.app_data::<web::Data<DbPool>>().ok_or(Error::Unauthorized)?;
    let conn = pool.get().map_err(|_| Error::Unauthorized)?;
    Ok(auth::decode(credentials.token(), &conn).map(|_| req)?)
}
