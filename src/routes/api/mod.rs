mod artists;

use actix_web::web;
use actix_web_httpauth::middleware::HttpAuthentication;

use crate::middleware::auth::validate_token;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .configure(artists::config)
            .wrap(HttpAuthentication::bearer(validate_token))
    );
}
