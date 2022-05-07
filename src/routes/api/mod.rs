mod albums;
mod artists;
mod files;
mod genres;
mod settings;
mod tracks;
mod users;

use actix_web::{web, middleware::Condition};
use actix_web_httpauth::middleware::HttpAuthentication;

use crate::middleware::auth::authenticate_user;

pub fn config(cfg: &mut web::ServiceConfig, allow_unauthenticated_access: bool) {
    cfg.service(
        web::scope("/api/v1")
            .configure(albums::config)
            .configure(artists::config)
            .configure(files::config)
            .configure(genres::config)
            .configure(settings::config)
            .configure(tracks::config)
            .configure(users::config)
            .wrap(Condition::new(!allow_unauthenticated_access, HttpAuthentication::bearer(authenticate_user)))
    );
}
