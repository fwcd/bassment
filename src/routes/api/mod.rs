mod albums;
mod artists;
mod files;
mod genres;
mod playlists;
mod settings;
mod tracks;
mod users;

use actix_web::{web, get, middleware::Condition, Responder};
use actix_web_httpauth::middleware::HttpAuthentication;
use serde::Serialize;

use crate::{middleware::auth::authenticate_user, error::Result};

#[derive(Debug, Serialize)]
struct Pong {
    message: String,
}

#[get("/ping")]
async fn ping() -> Result<impl Responder> {
    Ok(web::Json(Pong { message: "Pong!".to_owned() }))
}

pub fn config(cfg: &mut web::ServiceConfig, allow_unauthenticated_access: bool) {
    cfg.service(
        web::scope("/api/v1")
            .service(ping)
            .configure(albums::config)
            .configure(artists::config)
            .configure(files::config)
            .configure(genres::config)
            .configure(playlists::config)
            .configure(settings::config)
            .configure(tracks::config)
            .configure(users::config)
            .wrap(Condition::new(!allow_unauthenticated_access, HttpAuthentication::bearer(authenticate_user)))
    );
}
