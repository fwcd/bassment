-- Revert file table renaming.

ALTER TABLE file_infos
    RENAME TO file_locations;
