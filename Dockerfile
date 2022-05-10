# === Build the frontend ===
FROM node:18 as frontend-builder

WORKDIR /opt/bassment/frontend

# Copy package manifest and install npm dependencies
COPY frontend/package.json frontend/package-lock.json .
RUN npm install

# Copy remaining frontend and bundle it
COPY frontend .
RUN npm run build:web

# TODO: Use cargo-chef or similar to cache cargo dependencies
# (cargo can't do this natively yet: https://github.com/rust-lang/cargo/issues/2644)

# === Build the backend ===
FROM rust:1.60 as backend-builder

WORKDIR /opt/bassment

COPY src src
COPY migrations migrations
COPY Cargo.toml Cargo.lock diesel.toml .
RUN cargo build --release

# === Prepare the final runtime ===
FROM debian:buster-slim as runtime

# Install native dependencies (for interfacing with Postgres)
RUN apt-get update && apt-get install -y libpq-dev

# Copy binary and bundled frontend to runtime image
COPY LICENSE /usr/share/licenses/bassment
COPY --from=backend-builder /opt/bassment/target/release/bassment /usr/local/bin/bassment
COPY --from=frontend-builder /opt/bassment/frontend/dist /srv/bassment/frontend

ENTRYPOINT ["/usr/local/bin/bassment", "--frontend-path", "/srv/bassment/frontend"]
