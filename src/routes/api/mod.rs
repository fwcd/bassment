mod albums;
mod artists;
mod genres;
mod settings;
mod tracks;
mod users;

use actix_web::web;
use actix_web_httpauth::middleware::HttpAuthentication;

use crate::middleware::auth::authenticate_user;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .configure(albums::config)
            .configure(artists::config)
            .configure(genres::config)
            .configure(settings::config)
            .configure(tracks::config)
            .configure(users::config)
            .wrap(HttpAuthentication::bearer(authenticate_user))
    );
}
