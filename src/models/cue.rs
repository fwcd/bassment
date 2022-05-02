use std::time::SystemTime;

use diesel_derive_enum::DbEnum;
use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, DbEnum)]
#[DieselType = "Cue_kind"]
#[serde(rename_all = "snake_case")]
pub enum CueKind {
    HotCue,
    MainCue,
    Loop,
    Jump,
    Intro,
    Outro,
}
