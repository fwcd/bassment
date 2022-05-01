use actix_web::{web, post, Responder};
use chrono::Duration;

use crate::{db::DbPool, error::{Result, Error}, models::{Login, Signup, Claims, NewUser, TokenResponse}, actions::{auth, users}};

#[post("/login")]
async fn login(pool: web::Data<DbPool>, info: web::Json<Login>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let token = web::block(move || {
        let user = users::by_username(&info.username, &conn)?
            .ok_or_else(|| Error::Unauthorized(format!("Could not find user '{}'", info.username)))?;
        if !user.password_matches(&info.password)? {
            return Err(Error::Unauthorized(format!("Wrong password for username '{}'", info.username)));
        }
        auth::encode(Claims::new(Duration::minutes(60), &info.username), &conn)
    }).await??;
    // TODO: Return a refresh token instead?
    Ok(web::Json(TokenResponse { token }))
}

#[post("/signup")]
async fn signup(pool: web::Data<DbPool>, info: web::Json<Signup>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let user = web::block(move || {
        if users::by_username(&info.username, &conn).is_ok() {
            return Err(Error::Conflict(format!("Username '{}' already exists", info.username)));
        }
        users::insert(&NewUser::new(&info.username, &info.password, /* is_admin */ false)?, &conn)
    }).await??;
    Ok(web::Json(user))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/auth/v1")
            .service(login)
            .service(signup)
    );
}
