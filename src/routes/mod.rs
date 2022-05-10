mod api;
mod auth;
mod frontend;

use std::path::Path;

use actix_web::web;

use crate::options::Options;

pub fn config(cfg: &mut web::ServiceConfig, opts: &Options) {
    cfg
        .configure(|c| api::config(c, opts))
        .configure(auth::config);
    
    if let Some(ref path) = opts.frontend_path {
        frontend::config(cfg, path);
    }
}
