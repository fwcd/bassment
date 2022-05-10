use actix_multipart::Field;
use futures_util::StreamExt;

use crate::error::Result;

/// Reads the binary data from a multipart field.
pub async fn read_field_data(mut field: Field) -> Result<Vec<u8>> {
    let mut buffer: Vec<u8> = Vec::new();

    while let Some(chunk) = field.next().await {
        buffer.extend(&chunk?);
    }

    Ok(buffer)
}
