/// Replaces slashes and double dots in a name.
pub fn sanitize(name: &str) -> String {
    name.replace("/", "-")
        .replace("\\", "-")
        .replace("?", "-")
        .replace("..", "")
}
