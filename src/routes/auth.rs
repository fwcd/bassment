use actix_web::{web, post, Responder};
use chrono::Duration;

use crate::{db::DbPool, error::{Result, Error}, models::{Login, Signup, Claims, NewUser, TokenResponse}, actions::{auth, users}};

#[post("/login")]
async fn login(pool: web::Data<DbPool>, info: web::Json<Login>) -> Result<impl Responder> {
    let conn = pool.get()?;
    let user = users::by_username(&info.username, &conn)
        .map_err(|e| Error::Unauthorized(format!("Could not find user '{}': {:?}", info.username, e)))?;
    if !user.password_matches(&info.password)? {
        return Err(Error::Unauthorized(format!("Wrong password for username '{}'", info.username)));
    }
    // TODO: Return a refresh token instead?
    let token = auth::encode(Claims::new(Duration::minutes(60), &info.username), &conn)?;
    Ok(web::Json(TokenResponse { token }))
}

#[post("/signup")]
async fn signup(pool: web::Data<DbPool>, info: web::Json<Signup>) -> Result<impl Responder> {
    let conn = pool.get()?;
    if users::by_username(&info.username, &conn).is_ok() {
        return Err(Error::Conflict(format!("Username '{}' already exists", info.username)));
    }
    let user = users::insert(&NewUser::new(&info.username, &info.password, /* is_admin */ false)?, &conn)?;
    Ok(web::Json(user))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/auth/v1")
            .service(login)
            .service(signup)
    );
}
