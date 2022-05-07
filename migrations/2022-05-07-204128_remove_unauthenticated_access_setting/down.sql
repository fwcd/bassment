-- Adds the setting for unauthenticated access again.

ALTER TABLE settings
    ADD COLUMN allow_unauthenticated_access BOOLEAN NOT NULL DEFAULT FALSE;
