use diesel::{r2d2::{self, ConnectionManager}, PgConnection};

/// A single database connection.
pub type DbConn = PgConnection;

/// A pool of database connections.
pub type DbPool = r2d2::Pool<ConnectionManager<DbConn>>;
