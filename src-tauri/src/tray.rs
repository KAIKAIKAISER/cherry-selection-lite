use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle, Manager,
};

pub fn setup_tray(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let settings_item = MenuItem::with_id(app, "settings", "打开设置 (Settings)", true, None::<&str>)?;
    let toggle_item = MenuItem::with_id(app, "toggle", "划词助手: 开启", true, None::<&str>)?;
    let quit_item = MenuItem::with_id(app, "quit", "退出 (Quit)", true, None::<&str>)?;

    let menu = Menu::with_items(app, &[&settings_item, &toggle_item, &quit_item])?;

    let icon = app.default_window_icon().cloned().or_else(|| {
        tauri::image::Image::from_app_icon_resource(32).ok()
    });

    let mut builder = TrayIconBuilder::new()
        .menu(&menu)
        .show_menu_on_left_click(false)
        .tooltip("Cherry Selection Lite");

    if let Some(i) = icon {
        builder = builder.icon(i);
    }

    let _tray = builder
        .on_menu_event(move |app, event| match event.id.as_ref() {
            "settings" => {
                if let Some(st) = app.get_webview_window("settings") {
                    let _ = st.show();
                    let _ = st.set_focus();
                }
            }
            "quit" => {
                app.exit(0);
            }
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                let app = tray.app_handle();
                if let Some(st) = app.get_webview_window("settings") {
                    let is_vis = st.is_visible().unwrap_or(false);
                    if is_vis {
                        let _ = st.hide();
                    } else {
                        let _ = st.show();
                        let _ = st.set_focus();
                    }
                }
            }
        })
        .build(app)?;

    Ok(())
}
