-- Add a single-row table for the JWT secret.

CREATE TABLE token_secret (
    id BOOL PRIMARY KEY DEFAULT TRUE,
    secret BYTEA NOT NULL,
    CONSTRAINT only_one_secret CHECK (id)
);
