mod api;
mod auth;

use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .configure(api::config)
        .configure(auth::config);
}
