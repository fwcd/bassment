-- Re-add the file kind column.

ALTER TABLE file_infos
    ADD COLUMN kind file_kind DEFAULT 'generic' NOT NULL;
