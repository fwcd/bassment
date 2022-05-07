-- Removes the setting for unauthenticated access.

ALTER TABLE settings
    DROP COLUMN allow_unauthenticated_access;
