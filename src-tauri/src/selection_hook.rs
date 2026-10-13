use std::thread;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager};
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct SelectionPayload {
    pub text: String,
    pub x: i32,
    pub y: i32,
    pub program_name: Option<String>,
}

#[cfg(windows)]
pub mod win_impl {
    use super::*;
    use windows::Win32::Foundation::HWND;
    use windows::Win32::UI::WindowsAndMessaging::{
        GetCursorPos, GetForegroundWindow,
    };
    use windows::Win32::UI::Input::KeyboardAndMouse::{
        SendInput, INPUT, INPUT_0, INPUT_KEYBOARD, KEYBDINPUT,
        KEYEVENTF_KEYUP, VK_CONTROL, VK_C,
    };
    use windows::Win32::System::DataExchange::{
        CloseClipboard, GetClipboardData, OpenClipboard,
    };
    use windows::core::PCWSTR;

    pub fn get_mouse_pos() -> (i32, i32) {
        unsafe {
            let mut pt = windows::Win32::Foundation::POINT { x: 0, y: 0 };
            if GetCursorPos(&mut pt).is_ok() {
                (pt.x, pt.y)
            } else {
                (100, 100)
            }
        }
    }

    pub fn read_clipboard_text() -> Option<String> {
        unsafe {
            if OpenClipboard(HWND(std::ptr::null_mut())).is_ok() {
                let handle = GetClipboardData(13); // CF_UNICODETEXT = 13
                if let Ok(handle) = handle {
                    if !handle.0.is_null() {
                        let text_ptr = handle.0 as *const u16;
                        let text = PCWSTR::from_raw(text_ptr).to_string().ok();
                        let _ = CloseClipboard();
                        return text;
                    }
                }
                let _ = CloseClipboard();
            }
        }
        None
    }

    pub fn simulate_ctrl_c() {
        unsafe {
            let mut inputs = [
                INPUT {
                    r#type: INPUT_KEYBOARD,
                    Anonymous: INPUT_0 {
                        ki: KEYBDINPUT {
                            wVk: VK_CONTROL,
                            wScan: 0,
                            dwFlags: windows::Win32::UI::Input::KeyboardAndMouse::KEYBD_EVENT_FLAGS(0),
                            time: 0,
                            dwExtraInfo: 0,
                        },
                    },
                },
                INPUT {
                    r#type: INPUT_KEYBOARD,
                    Anonymous: INPUT_0 {
                        ki: KEYBDINPUT {
                            wVk: VK_C,
                            wScan: 0,
                            dwFlags: windows::Win32::UI::Input::KeyboardAndMouse::KEYBD_EVENT_FLAGS(0),
                            time: 0,
                            dwExtraInfo: 0,
                        },
                    },
                },
                INPUT {
                    r#type: INPUT_KEYBOARD,
                    Anonymous: INPUT_0 {
                        ki: KEYBDINPUT {
                            wVk: VK_C,
                            wScan: 0,
                            dwFlags: KEYEVENTF_KEYUP,
                            time: 0,
                            dwExtraInfo: 0,
                        },
                    },
                },
                INPUT {
                    r#type: INPUT_KEYBOARD,
                    Anonymous: INPUT_0 {
                        ki: KEYBDINPUT {
                            wVk: VK_CONTROL,
                            wScan: 0,
                            dwFlags: KEYEVENTF_KEYUP,
                            time: 0,
                            dwExtraInfo: 0,
                        },
                    },
                },
            ];

            SendInput(&inputs, std::mem::size_of::<INPUT>() as i32);
        }
    }
}

pub fn trigger_selection_capture(app: &AppHandle) {
    let app_handle = app.clone();
    thread::spawn(move || {
        #[cfg(windows)]
        {
            let old_clip = win_impl::read_clipboard_text().unwrap_or_default();
            win_impl::simulate_ctrl_c();
            thread::sleep(Duration::from_millis(60));

            if let Some(new_clip) = win_impl::read_clipboard_text() {
                let trimmed = new_clip.trim();
                if !trimmed.is_empty() && trimmed != old_clip.trim() {
                    let (x, y) = win_impl::get_mouse_pos();
                    let payload = SelectionPayload {
                        text: trimmed.to_string(),
                        x,
                        y,
                        program_name: None,
                    };

                    let _ = app_handle.emit("selection_updated", &payload);

                    if let Some(tb) = app_handle.get_webview_window("toolbar") {
                        let _ = tb.set_position(tauri::Position::Physical(tauri::PhysicalPosition {
                            x: x.saturating_add(8),
                            y: y.saturating_add(16),
                        }));
                        let _ = tb.show();
                        let _ = tb.set_focus();
                    }
                }
            }
        }
    });
}
