use actix_web::{dev::ServiceRequest, web};
use actix_web_httpauth::{extractors::bearer::BearerAuth};
use crate::{db::{DbPool, DbPooledConn}, error::Error, actions::{auth, users, settings}};

fn db_conn(req: &ServiceRequest) -> Result<DbPooledConn, actix_web::Error> {
    let pool = req.app_data::<web::Data<DbPool>>().ok_or_else(|| Error::Internal("Could not fetch DB pool".to_owned()))?;
    let conn = pool.get().map_err(|e| Error::Internal(format!("Could not fetch connection: {:?}", e)))?;
    Ok(conn)
}

/// Validates a token from the given credentials.
pub async fn authenticate_user(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, actix_web::Error> {
    let conn = db_conn(&req)?;
    // TODO: allow_unauthenticated_access still requires the user to pass
    //       an Authorization: Bearer header (with a dummy value) to get
    //       past the HttpAuthentication middleware. Ideally, this shouldn't
    //       be needed.
    if settings::get(&conn)?.allow_unauthenticated_access {
        Ok(req)
    } else {
        Ok(auth::decode(credentials.token(), &conn).map(|_| req)?)
    }
}

/// Validates a token and makes sure that the user is an admin from the given credentials.
pub async fn authenticate_admin(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, actix_web::Error> {
    let conn = db_conn(&req)?;
    let token = auth::decode(credentials.token(), &conn)?;
    let user = users::by_username(token.username(), &conn)?.ok_or_else(|| Error::Unauthorized(format!("No user for '{}'", token.username())))?;
    if user.is_admin {
        Ok(req)
    } else {
        Err(Error::Unauthorized("User is not an admin".to_owned()).into())
    }
}
