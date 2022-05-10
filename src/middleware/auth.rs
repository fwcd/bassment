use std::{future::{Ready, ready, Future}, pin::Pin, task::{Context, Poll}, sync::Arc};

use actix_web::{dev::{ServiceRequest, Transform, Service, ServiceResponse}, web::{self, Query}, http::header, FromRequest};
use once_cell::sync::Lazy;
use regex::Regex;
use serde::Deserialize;
use crate::{db::{DbPool, DbConn}, error::{Error, Result}, actions::{auth, users}};

/// Validates a token from the given credentials.
fn authenticate_user(token: &str, conn: &DbConn) -> Result<()> {
    auth::decode(token, conn)?;
    Ok(())
}

/// Validates a token and makes sure that the user is an admin from the given credentials.
fn authenticate_admin(token: &str, conn: &DbConn) -> Result<()> {
    let token = auth::decode(token, conn)?;
    let user = users::by_username(token.username(), &conn)?.ok_or_else(|| Error::Unauthorized(format!("No user for '{}'", token.username())))?;
    if user.is_admin {
        Ok(())
    } else {
        Err(Error::Unauthorized("User is not an admin".to_owned()))
    }
}

fn authenticate(token: &str, admin_only: bool, conn: &DbConn) -> Result<()> {
    if admin_only {
        authenticate_admin(token, conn)
    } else {
        authenticate_user(token, conn)
    }
}

/// The authentication middleware factory.
pub struct Authentication {
    admin_only: bool,
}

impl Authentication {
    pub fn user() -> Self { Self { admin_only: false } }

    pub fn admin() -> Self { Self { admin_only: true }}
}

impl<S, B> Transform<S, ServiceRequest> for Authentication
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error> + 'static,
    S::Future: 'static,
    B: 'static
{
    type Response = ServiceResponse<B>;
    type Error = actix_web::Error;
    type InitError = ();
    type Transform = AuthenticationMiddleware<S>;
    type Future = Ready<std::result::Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(AuthenticationMiddleware { service: Arc::new(service), admin_only: self.admin_only }))
    }
}

static BEARER_PATTERN: Lazy<Regex> = Lazy::new(|| Regex::new(r"^\s*[bB]earer\s+(\S+)\s*$").unwrap());

pub struct AuthenticationMiddleware<S> {
    service: Arc<S>,
    admin_only: bool,
}

impl<S> AuthenticationMiddleware<S> {
    
}

#[derive(Debug, Deserialize)]
struct TokenQuery {
    token: String,
}

impl<S, B> Service<ServiceRequest> for AuthenticationMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error> + 'static,
    S::Future: 'static,
    B: 'static
{
    type Response = ServiceResponse<B>;
    type Error = actix_web::Error;
    type Future = Pin<Box<dyn Future<Output = actix_web::Result<Self::Response>>>>;

    fn poll_ready(&self, ctx: &mut Context<'_>) -> Poll<actix_web::Result<()>> {
        self.service.poll_ready(ctx)
    }

    fn call(&self, mut req: ServiceRequest) -> Self::Future {
        let admin_only = self.admin_only;
        let service = self.service.clone();

        Box::pin(async move {
            let mut pass = false;

            // Fetch a pooled database connection
            let pool = req.app_data::<web::Data<DbPool>>().ok_or_else(|| Error::Internal("Could not fetch DB pool".to_owned()))?;
            let conn = pool.get().map_err(|e| Error::Internal(format!("Could not fetch connection: {:?}", e)))?;

            if let Some(captures) = req.headers().get(header::AUTHORIZATION)
                                                .and_then(|h| h.to_str().ok())
                                                .and_then(|s| BEARER_PATTERN.captures(s)) {
                // Authenticate via Authorization header
                let token = &captures[1];
                authenticate(token, admin_only, &conn)?;
                pass = true;
            } else if let Ok(query) = Query::<TokenQuery>::extract(&req.parts_mut().0).await {
                // Authenticate via query parameter
                authenticate(&query.token, admin_only, &conn)?;
                pass = true;
            }

            if pass {
                Ok(service.call(req).await?)
            } else {
                Err(Error::Unauthorized("Authentication failed".to_owned()).into())
            }
        })
    }
}
