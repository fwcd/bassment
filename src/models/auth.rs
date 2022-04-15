use serde::Deserialize;

#[derive(Deserialize)]
pub struct Login {
    username: String,
    password: String,
}

#[derive(Deserialize)]
pub struct Signup {
    username: String,
    password: String,
}
