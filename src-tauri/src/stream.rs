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
                let clean_msg = if let Ok(err_json) = serde_json::from_str::<Value>(&err_text) {
                    if let Some(msg) = err_json.get("error").and_then(|e| e.get("message")).and_then(|m| m.as_str()) {
                        Some(format!("HTTP {} 错误: {}", status, msg))
                    } else if let Some(msg) = err_json.get("detail").and_then(|d| d.get("error")).and_then(|e| e.get("message")).and_then(|m| m.as_str()) {
                        Some(format!("HTTP {} 错误: {}", status, msg))
                    } else if let Some(msg) = err_json.get("message").and_then(|m| m.as_str()) {
                        Some(format!("HTTP {} 错误: {}", status, msg))
                    } else {
                        None
                    }
                } else {
                    None
                };

                let final_message = clean_msg.unwrap_or_else(|| {
                    if err_text.trim().is_empty() {
                        format!("HTTP 状态异常 {}", status)
                    } else {
                        format!("HTTP 状态异常 {}: {}", status, err_text)
                    }
                });

                TestConnectionResult {
                    success: false,
                    latency_ms,
                    message: final_message,
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
        .map_err(|e| format!("网络客户端初始化失败: {e}"))?;

    let trimmed = base_url.trim_end_matches('/');

    // Handle Ollama
    if provider_id == "ollama" || trimmed.contains(":11434") {
        let url = format!("{}/api/tags", trimmed);
        let resp = client.get(&url).send().await.map_err(|e| format!("Ollama 连接失败: {e}"))?;
        let status = resp.status();
        let text = resp.text().await.map_err(|e| format!("读取响应失败: {e}"))?;

        if !status.is_success() {
            return Err(format!("Ollama API 错误 (HTTP {status}): {text}"));
        }

        let json: Value = serde_json::from_str(&text).map_err(|e| format!("JSON 解析失败: {e}"))?;
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
        if list.is_empty() {
            return Err("Ollama 未返回任何已下载模型，请先通过 ollama pull 下载模型".to_string());
        }
        return Ok(list);
    }

    // Handle Anthropic
    if provider_id == "anthropic" || trimmed.contains("anthropic.com") {
        let url = if trimmed.ends_with("/v1") {
            format!("{}/models", trimmed)
        } else {
            format!("{}/v1/models", trimmed)
        };
        let mut req = client.get(&url)
            .header("anthropic-version", "2023-06-01");
        if !api_key.trim().is_empty() {
            req = req.header("x-api-key", api_key.trim());
        }

        let resp = req.send().await.map_err(|e| format!("Anthropic 连接失败: {e}"))?;
        let status = resp.status();
        let text = resp.text().await.map_err(|e| format!("读取响应失败: {e}"))?;

        if !status.is_success() {
            if let Ok(err_json) = serde_json::from_str::<Value>(&text) {
                if let Some(msg) = err_json.get("error").and_then(|e| e.get("message")).and_then(|m| m.as_str()) {
                    return Err(format!("Anthropic API 错误 (HTTP {status}): {msg}"));
                }
            }
            return Err(format!("Anthropic HTTP 状态异常 {status}: {text}"));
        }

        let json: Value = serde_json::from_str(&text).map_err(|e| format!("JSON 解析失败: {e}"))?;
        let mut list = Vec::new();
        if let Some(data) = json.get("data").and_then(|d| d.as_array()) {
            for item in data {
                if let Some(id) = item.get("id").and_then(|i| i.as_str()) {
                    let name = item.get("display_name").and_then(|n| n.as_str()).unwrap_or(id);
                    list.push(FetchedModel {
                        id: id.to_string(),
                        name: name.to_string(),
                    });
                }
            }
        }
        if list.is_empty() {
            return Err("Anthropic 未返回可用模型列表".to_string());
        }
        return Ok(list);
    }

    // Handle Google Gemini
    if provider_id == "gemini" || provider_id == "google" || trimmed.contains("generativelanguage.googleapis.com") {
        let url = if trimmed.contains("?") {
            format!("{}&key={}", trimmed, api_key.trim())
        } else if trimmed.ends_with("/models") {
            format!("{}?key={}", trimmed, api_key.trim())
        } else {
            format!("{}/v1beta/models?key={}", trimmed, api_key.trim())
        };

        let resp = client.get(&url).send().await.map_err(|e| format!("Gemini 连接失败: {e}"))?;
        let status = resp.status();
        let text = resp.text().await.map_err(|e| format!("读取响应失败: {e}"))?;

        if !status.is_success() {
            if let Ok(err_json) = serde_json::from_str::<Value>(&text) {
                if let Some(msg) = err_json.get("error").and_then(|e| e.get("message")).and_then(|m| m.as_str()) {
                    return Err(format!("Gemini API 错误 (HTTP {status}): {msg}"));
                }
            }
            return Err(format!("Gemini HTTP 状态异常 {status}: {text}"));
        }

        let json: Value = serde_json::from_str(&text).map_err(|e| format!("JSON 解析失败: {e}"))?;
        let mut list = Vec::new();
        if let Some(models) = json.get("models").and_then(|m| m.as_array()) {
            for item in models {
                if let Some(name) = item.get("name").and_then(|n| n.as_str()) {
                    let clean_id = name.trim_start_matches("models/").to_string();
                    let display = item.get("displayName").and_then(|d| d.as_str()).map(|s| s.to_string()).unwrap_or_else(|| clean_id.clone());
                    list.push(FetchedModel {
                        id: clean_id,
                        name: display,
                    });
                }
            }
        }
        if list.is_empty() {
            return Err("Gemini 未返回可用模型列表".to_string());
        }
        return Ok(list);
    }

    // Standard OpenAI compatible (SiliconFlow, DeepSeek, OpenAI, Groq, Moonshot, etc.)
    let url = if trimmed.ends_with("/models") {
        trimmed.to_string()
    } else if trimmed.ends_with("/v1") {
        format!("{}/models", trimmed)
    } else {
        format!("{}/v1/models", trimmed)
    };

    let mut req = client.get(&url);
    if !api_key.trim().is_empty() {
        req = req.header("Authorization", format!("Bearer {}", api_key.trim()));
    }

    let resp = req.send().await.map_err(|e| format!("网络连接超时或错误: {e}"))?;
    let status = resp.status();
    let text = resp.text().await.map_err(|e| format!("读取响应数据失败: {e}"))?;

    if !status.is_success() {
        // Parse error message if JSON
        if let Ok(err_json) = serde_json::from_str::<Value>(&text) {
            if let Some(msg) = err_json.get("error").and_then(|e| e.get("message")).and_then(|m| m.as_str()) {
                return Err(format!("API 错误 (HTTP {status}): {msg}"));
            }
            if let Some(msg) = err_json.get("message").and_then(|m| m.as_str()) {
                return Err(format!("API 错误 (HTTP {status}): {msg}"));
            }
            if let Some(detail) = err_json.get("detail").and_then(|d| d.get("error")).and_then(|e| e.get("message")).and_then(|m| m.as_str()) {
                return Err(format!("API 错误 (HTTP {status}): {detail}"));
            }
        }
        return Err(format!("HTTP 状态异常 {status}: {text}"));
    }

    let json: Value = serde_json::from_str(&text).map_err(|e| format!("JSON 解析失败: {e}"))?;

    // Check for API-level business errors returned under HTTP 200 (e.g. {"code": 30014, "message": "Token is invalid."})
    if let Some(code) = json.get("code").and_then(|c| c.as_i64()) {
        if code != 0 && code != 200 {
            if let Some(msg) = json.get("message").and_then(|m| m.as_str()) {
                return Err(format!("API 返回业务错误 ({code}): {msg}"));
            }
        }
    }

    let mut list = Vec::new();

    // 1. Try parsing standard { "data": [ ... ] }
    if let Some(data) = json.get("data").and_then(|d| d.as_array()) {
        for item in data {
            if let Some(id) = item.get("id").and_then(|i| i.as_str()) {
                let name = item.get("name").and_then(|n| n.as_str()).unwrap_or(id);
                list.push(FetchedModel {
                    id: id.to_string(),
                    name: name.to_string(),
                });
            }
        }
    }

    // 2. Try parsing { "models": [ ... ] }
    if list.is_empty() {
        if let Some(models) = json.get("models").and_then(|m| m.as_array()) {
            for item in models {
                if let Some(id) = item.get("id").and_then(|i| i.as_str()).or_else(|| item.get("name").and_then(|n| n.as_str())) {
                    let name = item.get("name").and_then(|n| n.as_str()).unwrap_or(id);
                    list.push(FetchedModel {
                        id: id.to_string(),
                        name: name.to_string(),
                    });
                }
            }
        }
    }

    // 3. Try parsing root array [ ... ]
    if list.is_empty() {
        if let Some(arr) = json.as_array() {
            for item in arr {
                if let Some(id) = item.get("id").and_then(|i| i.as_str()).or_else(|| item.get("name").and_then(|n| n.as_str())).or_else(|| item.as_str()) {
                    list.push(FetchedModel {
                        id: id.to_string(),
                        name: id.to_string(),
                    });
                }
            }
        }
    }

    if list.is_empty() {
        return Err("API 响应成功，但未解析到可用模型数据，请确认 Base URL 是否正确".to_string());
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
