use diesel::{r2d2::{self, ConnectionManager}, PgConnection};

pub type DbConn = PgConnection;
pub type DbPool = r2d2::Pool<ConnectionManager<DbConn>>;
