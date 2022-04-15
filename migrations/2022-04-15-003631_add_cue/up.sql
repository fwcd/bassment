-- Add table for cue points.

CREATE TABLE cue (
    id SERIAL PRIMARY KEY,
    track_id INT REFERENCES track(id),
    type INT, -- see https://github.com/fwcd/mixync/blob/ef74bf59/mixync/model/cue_type.py
    position_ms INT,
    length_ms INT DEFAULT 0 NOT NULL,
    hotcue INT,
    label TEXT,
    color INT
);
