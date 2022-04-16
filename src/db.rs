use diesel::{r2d2::{self, ConnectionManager}, PgConnection};
use ::r2d2::PooledConnection;

/// A single database connection.
pub type DbConn = PgConnection;

/// A single pooled database connection.
pub type DbPooledConn = PooledConnection<ConnectionManager<DbConn>>;

/// A pool of database connections.
pub type DbPool = r2d2::Pool<ConnectionManager<DbConn>>;
