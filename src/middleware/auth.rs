use actix_web::{dev::ServiceRequest, web};
use actix_web_httpauth::{extractors::bearer::BearerAuth};

use crate::{db::DbPool, error::Error, actions::{auth, users}};

/// Validates a token from the given credentials.
pub async fn authenticate_user(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, actix_web::Error> {
    let pool = req.app_data::<web::Data<DbPool>>().ok_or(Error::Unauthorized)?;
    let conn = pool.get().map_err(|_| Error::Unauthorized)?;
    Ok(auth::decode(credentials.token(), &conn).map(|_| req)?)
}

/// Validates a token and makes sure that the user is an admin from the given credentials.
pub async fn authenticate_admin(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, actix_web::Error> {
    let pool = req.app_data::<web::Data<DbPool>>().ok_or(Error::Unauthorized)?;
    let conn = pool.get().map_err(|_| Error::Unauthorized)?;
    let token = auth::decode(credentials.token(), &conn)?;
    let user = users::by_username(token.username(), &conn)?;
    if user.is_admin {
        Ok(req)
    } else {
        Err(Error::Unauthorized.into())
    }
}
