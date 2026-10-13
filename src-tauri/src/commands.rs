use tauri::{AppHandle, Manager, State};
use std::sync::Mutex;
use crate::config::{load_config, save_config, AppConfig};
use crate::stream::{run_chat_stream, run_fetch_models, run_test_connection, FetchedModel, TestConnectionResult};

pub struct AppState {
    pub config: Mutex<AppConfig>,
}

#[tauri::command]
pub fn get_config(state: State<'_, AppState>) -> Result<AppConfig, String> {
    let cfg = state.config.lock().map_err(|e| e.to_string())?;
    Ok(cfg.clone())
}

#[tauri::command]
pub fn set_config(state: State<'_, AppState>, new_config: AppConfig) -> Result<AppConfig, String> {
    save_config(&new_config)?;
    let mut cfg = state.config.lock().map_err(|e| e.to_string())?;
    *cfg = new_config.clone();
    Ok(new_config)
}

#[tauri::command]
pub fn show_toolbar(app: AppHandle, x: i32, y: i32) -> Result<(), String> {
    if let Some(tb) = app.get_webview_window("toolbar") {
        let _ = tb.set_position(tauri::Position::Physical(tauri::PhysicalPosition {
            x: x.saturating_add(8),
            y: y.saturating_add(16),
        }));
        let _ = tb.show();
        let _ = tb.set_focus();
    }
    Ok(())
}

#[tauri::command]
pub fn hide_toolbar(app: AppHandle) -> Result<(), String> {
    if let Some(tb) = app.get_webview_window("toolbar") {
        let _ = tb.hide();
    }
    Ok(())
}

#[tauri::command]
pub fn show_action(app: AppHandle, _action_id: String, _custom_prompt: Option<String>) -> Result<(), String> {
    if let Some(tb) = app.get_webview_window("toolbar") {
        let _ = tb.hide();
    }
    if let Some(act) = app.get_webview_window("action") {
        let _ = act.show();
        let _ = act.set_focus();
    }
    Ok(())
}

#[tauri::command]
pub fn hide_action(app: AppHandle) -> Result<(), String> {
    if let Some(act) = app.get_webview_window("action") {
        let _ = act.hide();
    }
    Ok(())
}

#[tauri::command]
pub fn pin_action(app: AppHandle, pinned: bool) -> Result<(), String> {
    if let Some(act) = app.get_webview_window("action") {
        let _ = act.set_always_on_top(pinned);
    }
    Ok(())
}

#[tauri::command]
pub fn open_settings(app: AppHandle) -> Result<(), String> {
    if let Some(st) = app.get_webview_window("settings") {
        let _ = st.show();
        let _ = st.set_focus();
    }
    Ok(())
}

#[tauri::command]
pub fn copy_to_clipboard(text: String) -> Result<(), String> {
    #[cfg(windows)]
    {
        use windows::Win32::Foundation::HWND;
        use windows::Win32::System::DataExchange::{CloseClipboard, EmptyClipboard, OpenClipboard, SetClipboardData};
        use windows::Win32::System::Memory::{GlobalAlloc, GlobalLock, GlobalUnlock, GHND};

        unsafe {
            if OpenClipboard(HWND(std::ptr::null_mut())).is_ok() {
                let _ = EmptyClipboard();
                let wide: Vec<u16> = text.encode_utf16().chain(std::iter::once(0)).collect();
                let size = wide.len() * 2;
                if let Ok(hglobal) = GlobalAlloc(GHND, size) {
                    let ptr = GlobalLock(hglobal);
                    if !ptr.is_null() {
                        std::ptr::copy_nonoverlapping(wide.as_ptr() as *const u8, ptr as *mut u8, size);
                        let _ = GlobalUnlock(hglobal);
                        let _ = SetClipboardData(13, windows::Win32::Foundation::HANDLE(hglobal.0));
                    }
                }
                let _ = CloseClipboard();
            }
        }
    }
    Ok(())
}

#[tauri::command]
pub async fn test_provider(
    base_url: String,
    api_key: String,
    model_id: Option<String>,
) -> TestConnectionResult {
    run_test_connection(base_url, api_key, model_id).await
}

#[tauri::command]
pub async fn sync_models(
    base_url: String,
    api_key: String,
    provider_id: String,
) -> Result<Vec<FetchedModel>, String> {
    run_fetch_models(base_url, api_key, provider_id).await
}

#[tauri::command]
pub async fn start_chat_stream(
    app: AppHandle,
    base_url: String,
    api_key: String,
    model: String,
    prompt: String,
) -> Result<(), String> {
    tokio::spawn(async move {
        run_chat_stream(app, base_url, api_key, model, prompt).await;
    });
    Ok(())
}

#[tauri::command]
pub fn stop_chat_stream() -> Result<(), String> {
    Ok(())
}
