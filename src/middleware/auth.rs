use std::{future::{Ready, ready, Future}, pin::Pin, task::{Context, Poll}, result};

use actix_web::{dev::{Transform, ServiceRequest, Service, ServiceResponse}, http::header, web};
use lazy_static::lazy_static;
use regex::Regex;

use crate::{error::{Error, Result}, actions::auth, db::DbPool};

pub struct Authentication;

impl<S, B> Transform<S, ServiceRequest> for Authentication
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = AuthenticationMiddleware<S>;
    type Future = Ready<result::Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(AuthenticationMiddleware { service }))
    }
}

lazy_static! {
    static ref BEARER_PATTERN: Regex = Regex::new(r"^\s*[bB]earer\s+(\S+)\s*$").unwrap();
}

pub struct AuthenticationMiddleware<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for AuthenticationMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response>>>>;

    fn poll_ready(&self, ctx: &mut Context<'_>) -> Poll<Result<()>> {
        self.service.poll_ready(ctx)
    }

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let mut pass = false;

        // Search Authorization header for a Bearer token
        if let Some(captures) = req.headers().get(header::AUTHORIZATION)
                                             .and_then(|h| h.to_str().ok())
                                             .and_then(|s| BEARER_PATTERN.captures(s)) {
            let token = &captures[1];
            // Grab a database connection from the pool
            if let Some(conn) = req.app_data::<web::Data<DbPool>>()
                                   .and_then(|p| p.get().ok()) {
                // Validate the token
                if auth::decode(token, &conn).is_ok() {
                    pass = true;
                }
            }
        }

        if pass {
            let fut = self.service.call(req);
            Box::pin(async move {
                Ok(fut.await?)
            })
        } else {
            Box::pin(async move {
                Err(Error::Unauthorized)
            })
        }
    }
}
