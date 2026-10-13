use futures_util::StreamExt;
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION, CONTENT_TYPE};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::time::Instant;
use tauri::{AppHandle, Emitter};

#[derive(Debug, Serialize, Deserialize)]
pub struct TestConnectionResult {
    pub success: bool,
    pub latency_ms: u64,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchedModel {
    pub id: String,
    pub name: String,
}

pub async fn run_test_connection(
    base_url: String,
    api_key: String,
    model_id: Option<String>,
) -> TestConnectionResult {
    let start = Instant::now();
    let client = match reqwest::Client::builder()
        .timeout(std::time::Duration::from_millis(6000))
        .build()
    {
        Ok(c) => c,
        Err(e) => {
            return TestConnectionResult {
                success: false,
                latency_ms: 0,
                message: format!("客户端初始化失败: {}", e),
            }
        }
    };

    let trimmed_base = base_url.trim_end_matches('/');
    let url = if trimmed_base.contains("/chat/completions") {
        trimmed_base.to_string()
    } else if trimmed_base.ends_with("/v1") {
        format!("{}/chat/completions", trimmed_base)
    } else {
        format!("{}/v1/chat/completions", trimmed_base)
    };

    let mut headers = HeaderMap::new();
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
    if !api_key.trim().is_empty() {
        if let Ok(hv) = HeaderValue::from_str(&format!("Bearer {}", api_key.trim())) {
            headers.insert(AUTHORIZATION, hv);
        }
    }

    let model = model_id.unwrap_or_else(|| "gpt-3.5-turbo".to_string());
    let body = serde_json::json!({
        "model": model,
        "messages": [{"role": "user", "content": "ping"}],
        "max_tokens": 1
    });

    match client.post(&url).headers(headers).json(&body).send().await {
        Ok(resp) => {
            let latency_ms = start.elapsed().as_millis() as u64;
            let status = resp.status();
            if status.is_success() || status.as_u16() == 400 || status.as_u16() == 429 {
                TestConnectionResult {
                    success: true,
                    latency_ms,
                    message: format!("连接正常 (HTTP {}, 延迟 {}ms)", status, latency_ms),
                }
            } else {
                let err_text = resp.text().await.unwrap_or_default();
                TestConnectionResult {
                    success: false,
                    latency_ms,
                    message: format!("HTTP 状态异常 {}: {}", status, err_text),
                }
            }
        }
        Err(e) => {
            let latency_ms = start.elapsed().as_millis() as u64;
            TestConnectionResult {
                success: false,
                latency_ms,
                message: format!("网络连接超时或错误: {}", e),
            }
        }
    }
}

pub async fn run_fetch_models(
    base_url: String,
    api_key: String,
    provider_id: String,
) -> Result<Vec<FetchedModel>, String> {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_millis(8000))
        .build()
        .map_err(|e| e.to_string())?;

    let trimmed = base_url.trim_end_matches('/');

    // Handle Ollama
    if provider_id == "ollama" || trimmed.contains(":11434") {
        let url = format!("{}/api/tags", trimmed);
        let resp = client.get(&url).send().await.map_err(|e| e.to_string())?;
        let json: Value = resp.json().await.map_err(|e| e.to_string())?;
        let mut list = Vec::new();
        if let Some(models) = json.get("models").and_then(|m| m.as_array()) {
            for m in models {
                if let Some(name) = m.get("name").and_then(|n| n.as_str()) {
                    list.push(FetchedModel {
                        id: name.to_string(),
                        name: name.to_string(),
                    });
                }
            }
        }
        return Ok(list);
    }

    // Standard OpenAI compatible
    let url = if trimmed.ends_with("/v1") {
        format!("{}/models", trimmed)
    } else {
        format!("{}/v1/models", trimmed)
    };

    let mut req = client.get(&url);
    if !api_key.trim().is_empty() {
        req = req.header("Authorization", format!("Bearer {}", api_key.trim()));
    }

    let resp = req.send().await.map_err(|e| e.to_string())?;
    let json: Value = resp.json().await.map_err(|e| e.to_string())?;

    let mut list = Vec::new();
    if let Some(data) = json.get("data").and_then(|d| d.as_array()) {
        for item in data {
            if let Some(id) = item.get("id").and_then(|i| i.as_str()) {
                list.push(FetchedModel {
                    id: id.to_string(),
                    name: id.to_string(),
                });
            }
        }
    }

    if list.is_empty() {
        return Err("API 未返回有效的模型列表数据".to_string());
    }

    Ok(list)
}

pub async fn run_chat_stream(
    app: AppHandle,
    base_url: String,
    api_key: String,
    model: String,
    prompt: String,
) {
    let client = match reqwest::Client::builder().build() {
        Ok(c) => c,
        Err(e) => {
            let _ = app.emit("llm_error", e.to_string());
            return;
        }
    };

    let trimmed = base_url.trim_end_matches('/');
    let url = if trimmed.contains("/chat/completions") {
        trimmed.to_string()
    } else if trimmed.ends_with("/v1") {
        format!("{}/chat/completions", trimmed)
    } else {
        format!("{}/v1/chat/completions", trimmed)
    };

    let mut headers = HeaderMap::new();
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
    if !api_key.trim().is_empty() {
        if let Ok(hv) = HeaderValue::from_str(&format!("Bearer {}", api_key.trim())) {
            headers.insert(AUTHORIZATION, hv);
        }
    }

    let body = serde_json::json!({
        "model": model,
        "messages": [
            { "role": "user", "content": prompt }
        ],
        "stream": true,
        "temperature": 0.7
    });

    let resp = match client.post(&url).headers(headers).json(&body).send().await {
        Ok(r) => r,
        Err(e) => {
            let _ = app.emit("llm_error", format!("网络请求失败: {}", e));
            return;
        }
    };

    if !resp.status().is_success() {
        let err_text = resp.text().await.unwrap_or_default();
        let _ = app.emit("llm_error", format!("API 错误: {}", err_text));
        return;
    }

    let mut stream = resp.bytes_stream();
    let mut buffer = String::new();

    while let Some(item) = stream.next().await {
        match item {
            Ok(bytes) => {
                if let Ok(text) = std::str::from_utf8(&bytes) {
                    buffer.push_str(text);

                    while let Some(pos) = buffer.find('\n') {
                        let line = buffer[..pos].trim().to_string();
                        buffer = buffer[pos + 1..].to_string();

                        if line.starts_with("data: ") {
                            let data_str = &line[6..].trim();
                            if *data_str == "[DONE]" {
                                break;
                            }
                            if let Ok(parsed) = serde_json::from_str::<Value>(data_str) {
                                if let Some(content) = parsed
                                    .pointer("/choices/0/delta/content")
                                    .and_then(|c| c.as_str())
                                {
                                    let _ = app.emit("llm_chunk", content.to_string());
                                }
                            }
                        }
                    }
                }
            }
            Err(e) => {
                let _ = app.emit("llm_error", format!("流式传输中断: {}", e));
                return;
            }
        }
    }

    let _ = app.emit("llm_done", ());
}
