use diesel::{r2d2, PgConnection};

pub type DbPool = r2d2::Pool<PgConnection>;
pub type DbError = Box<dyn std::error::Error + Send + Sync>;
pub type DbResult<T> = Result<T, DbError>;
