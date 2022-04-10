# Bassment

Music library server with support for cue points, playlists, crates and more.

## Development

To develop Bassment, make sure to have a Rust toolchain and PostgreSQL installed (the latter also running). Create a PostgreSQL database and a `.env` file in this repo that points to the database:

```
DATABASE_URL=postgres://your_username:your_password@localhost/your_db_name
```

To start the server, run `cargo run`.

> Note that the Diesel CLI, which can be installed using `cargo install diesel_cli --no-default-features --features postgres` (see [here](https://diesel.rs/guides/getting-started)), might also be useful
