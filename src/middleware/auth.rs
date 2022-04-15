use std::{future::{Ready, ready, Future}, pin::Pin, task::{Context, Poll}, result};

use actix_web::dev::{Transform, ServiceRequest, Service, ServiceResponse};

use crate::error::{Error, Result};

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

        // TODO: Validate the JWT token

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
