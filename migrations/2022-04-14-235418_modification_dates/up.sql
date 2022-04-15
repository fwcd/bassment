-- Add modification dates to most entities and corresponding triggers.

ALTER TABLE artist
    ADD COLUMN last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL;

ALTER TABLE album
    ADD COLUMN last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL;

ALTER TABLE genre
    ADD COLUMN last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL;

-- Helper functions for creating triggers that automatically
-- update last_modified_at timestamps.

CREATE OR REPLACE FUNCTION update_last_modified() RETURNS TRIGGER AS $$
BEGIN
    IF (
        NEW IS DISTINCT FROM OLD AND
        NEW.last_modified_at IS NOT DISTINCT FROM OLD.last_modified_at
    ) THEN
        NEW.last_modified_at := current_timestamp;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION manage_last_modified(_tbl regclass) RETURNS VOID AS $$
BEGIN
    EXECUTE format('CREATE TRIGGER update_last_modified BEFORE UPDATE ON %s
                    FOR EACH ROW EXECUTE PROCEDURE update_last_modified()', _tbl);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION unmanage_last_modified(_tbl regclass) RETURNS VOID AS $$
BEGIN
    EXECUTE format('DROP TRIGGER IF EXISTS update_last_modified ON %s', _tbl);
END;
$$ LANGUAGE plpgsql;

-- Attach these helpers to the corresponding tables.

SELECT manage_last_modified('track');
SELECT manage_last_modified('genre');
SELECT manage_last_modified('album');
SELECT manage_last_modified('artist');
