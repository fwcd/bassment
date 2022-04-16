-- Add a single-row table for the JWT secret.

CREATE TABLE token_secret (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE,
    secret BYTEA NOT NULL,
    CONSTRAINT only_one_secret CHECK (id)
);

-- Generate a cryptographically strong random 256-bit secret.

INSERT INTO token_secret VALUES (
    TRUE,
    gen_random_bytes(32)
);
