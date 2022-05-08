use std::time::SystemTime;

use diesel_derive_enum::DbEnum;
use serde::{Serialize, Deserialize};

use crate::schema::*;

#[derive(Debug, Clone, Serialize, Deserialize, DbEnum)]
#[serde(rename_all = "camelCase")]
#[DieselType = "Cue_kind"]
pub enum CueKind {
    HotCue,
    MainCue,
    Loop,
    Jump,
    Intro,
    Outro,
}
