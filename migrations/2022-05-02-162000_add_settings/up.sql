-- Add a single-row table with settings.

CREATE TABLE settings (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE,
    CONSTRAINT only_one_settings CHECK (id),
    allow_unauthenticated_access BOOLEAN NOT NULL DEFAULT FALSE,
    file_storage_base_directory TEXT NOT NULL DEFAULT './local'
);

INSERT INTO settings (id) VALUES (DEFAULT);
