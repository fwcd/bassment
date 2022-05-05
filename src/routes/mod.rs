mod api;
mod auth;
mod frontend;

use std::path::Path;

use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig, frontend_path: Option<&Path>) {
    cfg
        .configure(api::config)
        .configure(auth::config);
    
    if let Some(path) = frontend_path {
        frontend::config(cfg, path);
    }
}
