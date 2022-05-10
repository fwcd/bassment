mod albums;
mod artists;
mod files;
mod genres;
mod playlists;
mod settings;
mod tracks;
mod users;

use actix_web::{web, get, middleware::Condition, Responder};
use serde::Serialize;

use crate::{middleware::auth::Authentication, error::Result, options::Options};

#[derive(Debug, Serialize)]
struct Pong {
    message: String,
}

#[get("/ping")]
async fn ping() -> Result<impl Responder> {
    Ok(web::Json(Pong { message: "Pong!".to_owned() }))
}

pub fn config(cfg: &mut web::ServiceConfig, opts: &Options) {
    cfg.service(
        web::scope("/api/v1")
            .service(ping)
            .configure(albums::config)
            .configure(artists::config)
            .configure(genres::config)
            .configure(playlists::config)
            .configure(settings::config)
            .configure(users::config)
            .configure(|c| files::config(c, opts))
            .configure(|c| tracks::config(c, opts))
            .wrap(Condition::new(!opts.allow_unauthenticated_access, Authentication::user()))
    );
}
