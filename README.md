# Bassment

[![Build](https://github.com/fwcd/bassment/actions/workflows/build.yml/badge.svg)](https://github.com/fwcd/bassment/actions/workflows/build.yml)
[![Frontend](https://github.com/fwcd/bassment/actions/workflows/frontend.yml/badge.svg)](https://github.com/fwcd/bassment/actions/workflows/frontend.yml)

Music library server with support for cue points, playlists, crates and more.

<img alt="Icon" src="icons/icon-rounded.svg" width="100">

## Repository Structure

Bassment primarily consists of two components:

- The backend server, written in Rust (with `actix-web` and `diesel`), is located in the repository root.
- The frontend, written in React Native (targeting Web, iOS and Android), is located in the `frontend` folder.

While the backend server can serve the frontend from `frontend/dist` (after building and bundling it with Webpack), it can also run in API-only mode and independently (with `--api-only`).

## Getting Started

### Backend

<!-- TODO: Add instructions for setting up the frontend dev server (npm run web, etc.), bundling it for production (npm run build:web, etc.) and running the backend server for use in conjunction with the frontend dev server (cargo run -- --api-only --local-cors) -->

To develop the backend server, make sure to have a Rust toolchain and PostgreSQL installed (the latter also running). Create a database and make sure that the `pgcrypto` extension is enabled (within the database). With sufficient privileges, you can enable it from `psql your_db_name` using

```sql
CREATE EXTENSION pgcrypto;
```

Create a database and a `.env` file in this repo that points to the database:

```
DATABASE_URL=postgres://your_username:your_password@localhost/your_db_name
```

To start the server, run `cargo run`. By default, the server will run on `http://localhost:8090` (to permit running it simultaneously with the frontend dev server). For development, there are a bunch of convenient options: If you want to run the backend separately from the frontend and permit CORS requests from a frontend dev server (you probably do, `webpack-dev-server` uses `http://localhost:8080`), start it with the following options:

```sh
cargo run -- \
  --api-only \   # disable serving the frontend on /
  --allow-cors   # allow CORS requests (don't use in prod!)
```

For convenience, there exists a script that invokes `cargo` exactly in this way:

```sh
scripts/run-dev-backend
```

On the first run, the server will automatically run all of the migrations and generate a root user, whose password is output to the console. If, at any point, you wish to regenerate this root user, pass `--regenerate-root` to the server (e.g. as invoked via `cargo run`).

> Note that the Diesel CLI, which can be installed using `cargo install diesel_cli --no-default-features --features postgres` (see [here](https://diesel.rs/guides/getting-started)), might also be useful. The Diesel CLI lets you e.g. run migrations with `diesel migration run` and undo them with `diesel migration revert`.

Since all API routes are gated behind authentication (you need to log in via `/auth/v1/login`), it can sometimes be cumbersome to manually copy-and-paste tokens to `curl` while developing. Therefore the server also supports the flag `--allows-unauthenticated-access` for disabling authentication (obviously do not use this production):

```sh
cargo run -- \
  --api-only \                   # disable serving the frontend on /
  --allow-cors \                 # allow CORS requests (don't use in prod!)
  --allow-unauthenticated-access # disable auth (don't use in prod!)
```

We can verify that this works correctly by sending a simple API request with `curl`:

```sh
curl -i http://localhost:8090/api/v1/tracks
```

```
HTTP/1.1 200 OK
content-length: 2
access-control-expose-headers: host, user-agent, accept
vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers
access-control-allow-credentials: true
content-type: application/json
date: Sun, 08 May 2022 19:42:42 GMT

[]
```

### Frontend

To develop the frontend, you can either use `npm` in the `frontend` directory directly or the convenience scripts mentioned in the following paragraphs from the repository root.

First, make sure to have the npm dependencies installed:

```sh
scripts/bootstrap-frontend
```

Now you can run the frontend with a dev server on `http://localhost:8080` (you probably want to have the backend running in API-only mode simultaneously for it to do anything useful):

```sh
scripts/run-dev-frontend
```
