use actix_multipart::Field;
use futures_util::StreamExt;
use serde::de::DeserializeOwned;

use crate::error::Result;

/// Reads the binary data from a multipart field.
pub async fn read_field_data(mut field: Field) -> Result<Vec<u8>> {
    let mut buffer: Vec<u8> = Vec::new();

    while let Some(chunk) = field.next().await {
        buffer.extend(&chunk?);
    }

    Ok(buffer)
}

/// Decodes a JSON object from a multipart field.
pub async fn read_field_json<T>(field: Field) -> Result<T> where T: DeserializeOwned {
    let data = read_field_data(field).await?;
    Ok(serde_json::from_slice(&data)?)
}
