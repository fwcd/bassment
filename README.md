# Bassment

[![Build](https://github.com/fwcd/bassment/actions/workflows/build.yml/badge.svg)](https://github.com/fwcd/bassment/actions/workflows/build.yml)
[![Frontend](https://github.com/fwcd/bassment/actions/workflows/frontend.yml/badge.svg)](https://github.com/fwcd/bassment/actions/workflows/frontend.yml)

Music library server with support for cue points, playlists, crates and more.

<img alt="Icon" src="icons/icon-rounded.svg" width="100">

## Development

To develop Bassment, make sure to have a Rust toolchain and PostgreSQL installed (the latter also running). Create a database and make sure that the `pgcrypto` extension is enabled (within the database). With sufficient privileges, you can enable it from `psql your_db_name` using

```sql
CREATE EXTENSION pgcrypto;
```

Create a database and a `.env` file in this repo that points to the database:

```
DATABASE_URL=postgres://your_username:your_password@localhost/your_db_name
```

To start the server, run `cargo run` (this will automatically run all of the migrations).

> Note that the Diesel CLI, which can be installed using `cargo install diesel_cli --no-default-features --features postgres` (see [here](https://diesel.rs/guides/getting-started)), might also be useful. The Diesel CLI lets you e.g. run migrations with `diesel migration run` and undo them with `diesel migration revert`.
