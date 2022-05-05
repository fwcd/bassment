use std::path::Path;

use actix_files::Files;
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig, frontend_path: &Path) {
    cfg.service(
        Files::new("/", frontend_path.to_str().expect("Invalid frontend path"))
            .index_file("index.html")
    );
}
