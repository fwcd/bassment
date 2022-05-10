use std::path::PathBuf;

/// Options passed via the command line.
pub struct Options {
    /// The path to the frontend.
    pub frontend_path: Option<PathBuf>,
    /// Whether unauthenticated access to the API should be permitted.
    pub allow_unauthenticated_access: bool,
    /// The maximum upload size in bytes.
    pub upload_limit: usize,
}
