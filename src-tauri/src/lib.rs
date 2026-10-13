pub mod config;
pub mod commands;
pub mod stream;
pub mod selection_hook;
pub mod tray;

use std::sync::Mutex;
use tauri_plugin_global_shortcut::{GlobalShortcutExt, Shortcut};
use commands::AppState;
use config::load_config;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let initial_config = load_config();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .manage(AppState {
            config: Mutex::new(initial_config),
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_config,
            commands::set_config,
            commands::show_toolbar,
            commands::hide_toolbar,
            commands::show_action,
            commands::hide_action,
            commands::pin_action,
            commands::open_settings,
            commands::copy_to_clipboard,
            commands::test_provider,
            commands::sync_models,
            commands::start_chat_stream,
            commands::stop_chat_stream,
        ])
        .setup(|app| {
            let handle = app.handle();
            let _ = tray::setup_tray(handle);

            // Register default global hotkey Alt+S
            if let Ok(shortcut) = "Alt+S".parse::<Shortcut>() {
                let app_handle = handle.clone();
                let _ = app.global_shortcut().on_shortcut(shortcut, move |_app, _sc, event| {
                    if event.state() == tauri_plugin_global_shortcut::ShortcutState::Pressed {
                        selection_hook::trigger_selection_capture(&app_handle);
                    }
                });
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running cherry selection lite application");
}
