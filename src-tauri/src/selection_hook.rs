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
        GetCursorPos, GetForegroundWindow, GetWindowThreadProcessId,
    };
    use windows::Win32::UI::Input::KeyboardAndMouse::{
        GetAsyncKeyState, SendInput, INPUT, INPUT_0, INPUT_KEYBOARD, KEYBDINPUT,
        KEYEVENTF_KEYUP, VK_CONTROL, VK_C, VK_LBUTTON,
    };
    use windows::Win32::System::DataExchange::{
        CloseClipboard, GetClipboardData, GetClipboardSequenceNumber, OpenClipboard,
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

    pub fn get_foreground_window() -> HWND {
        unsafe { GetForegroundWindow() }
    }

    pub fn get_window_pid(hwnd: HWND) -> u32 {
        unsafe {
            let mut pid = 0u32;
            GetWindowThreadProcessId(hwnd, Some(&mut pid));
            pid
        }
    }

    pub fn is_ctrl_pressed() -> bool {
        unsafe { (GetAsyncKeyState(VK_CONTROL.0 as i32) as u16 & 0x8000) != 0 }
    }

    pub fn is_lbutton_pressed() -> bool {
        unsafe { (GetAsyncKeyState(VK_LBUTTON.0 as i32) as u16 & 0x8000) != 0 }
    }

    pub fn get_clipboard_seq() -> u32 {
        unsafe { GetClipboardSequenceNumber() }
    }

    pub fn read_clipboard_text() -> Option<String> {
        unsafe {
            for _ in 0..6 {
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
                    break;
                }
                thread::sleep(Duration::from_millis(15));
            }
        }
        None
    }

    pub fn simulate_ctrl_c() {
        unsafe {
            let is_ctrl_down = (GetAsyncKeyState(VK_CONTROL.0 as i32) as u16 & 0x8000) != 0;
            if is_ctrl_down {
                // Physical Ctrl is already pressed, send only C key down and up
                let inputs = [
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
                ];
                SendInput(&inputs, std::mem::size_of::<INPUT>() as i32);
            } else {
                // Complete Ctrl+C sequence
                let inputs = [
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
}

pub fn trigger_selection_capture(app: &AppHandle) {
    let app_handle = app.clone();
    thread::spawn(move || {
        #[cfg(windows)]
        {
            let seq_before = win_impl::get_clipboard_seq();
            let old_clip = win_impl::read_clipboard_text().unwrap_or_default();

            win_impl::simulate_ctrl_c();
            thread::sleep(Duration::from_millis(70));

            let seq_after = win_impl::get_clipboard_seq();
            if let Some(new_clip) = win_impl::read_clipboard_text() {
                let trimmed = new_clip.trim();
                let is_fresh_selection = (!trimmed.is_empty() && seq_after != seq_before)
                    || (!trimmed.is_empty() && trimmed != old_clip.trim());

                if is_fresh_selection {
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

pub fn start_selection_monitor(app: &AppHandle) {
    let app_handle = app.clone();
    thread::spawn(move || {
        #[cfg(windows)]
        {
            use std::time::Instant;

            let current_pid = std::process::id();
            let mut ctrl_hold_start: Option<Instant> = None;
            let mut ctrl_triggered = false;
            let mut lbutton_was_down = false;
            let mut lbutton_down_pos = (0, 0);
            let mut last_trigger_time = Instant::now() - Duration::from_secs(5);

            loop {
                thread::sleep(Duration::from_millis(25));

                // 1. Get enabled & trigger_mode from AppState
                let (enabled, trigger_mode) = {
                    if let Some(state) = app_handle.try_state::<crate::commands::AppState>() {
                        if let Ok(cfg) = state.config.lock() {
                            (cfg.selection.enabled, cfg.selection.trigger_mode.clone())
                        } else {
                            (true, "ctrlkey".to_string())
                        }
                    } else {
                        (true, "ctrlkey".to_string())
                    }
                };

                if !enabled || trigger_mode == "shortcut" {
                    ctrl_hold_start = None;
                    ctrl_triggered = false;
                    lbutton_was_down = false;
                    continue;
                }

                // 2. Ignore if foreground window belongs to our own app (avoid self-trigger)
                let fg_hwnd = win_impl::get_foreground_window();
                let fg_pid = win_impl::get_window_pid(fg_hwnd);
                if fg_pid == current_pid {
                    ctrl_hold_start = None;
                    ctrl_triggered = false;
                    continue;
                }

                // 3. Check key states
                let is_ctrl_down = win_impl::is_ctrl_pressed();
                let is_lbutton_down = win_impl::is_lbutton_pressed();
                let current_pos = win_impl::get_mouse_pos();
                let can_trigger = last_trigger_time.elapsed() >= Duration::from_millis(300);

                if trigger_mode == "ctrlkey" {
                    // Scenario A: Long-press Ctrl (holds Ctrl continuously for ~350ms)
                    if is_ctrl_down {
                        if ctrl_hold_start.is_none() {
                            ctrl_hold_start = Some(Instant::now());
                        } else if !ctrl_triggered && can_trigger {
                            if let Some(start) = ctrl_hold_start {
                                if start.elapsed() >= Duration::from_millis(350) {
                                    ctrl_triggered = true;
                                    last_trigger_time = Instant::now();
                                    trigger_selection_capture(&app_handle);
                                }
                            }
                        }
                    } else {
                        ctrl_hold_start = None;
                        ctrl_triggered = false;
                    }

                    // Scenario B: Holding Ctrl while mouse selecting text (mouse drag release)
                    if !is_lbutton_down && lbutton_was_down {
                        let moved_x = (current_pos.0 - lbutton_down_pos.0).abs();
                        let moved_y = (current_pos.1 - lbutton_down_pos.1).abs();
                        if is_ctrl_down && (moved_x > 8 || moved_y > 8) && can_trigger {
                            ctrl_triggered = true;
                            last_trigger_time = Instant::now();
                            thread::sleep(Duration::from_millis(50));
                            trigger_selection_capture(&app_handle);
                        }
                    }
                } else if trigger_mode == "selection" {
                    // Trigger when mouse drag selection ends
                    if !is_lbutton_down && lbutton_was_down {
                        let moved_x = (current_pos.0 - lbutton_down_pos.0).abs();
                        let moved_y = (current_pos.1 - lbutton_down_pos.1).abs();
                        if (moved_x > 10 || moved_y > 10) && can_trigger {
                            last_trigger_time = Instant::now();
                            thread::sleep(Duration::from_millis(70));
                            trigger_selection_capture(&app_handle);
                        }
                    }
                }

                if is_lbutton_down && !lbutton_was_down {
                    lbutton_down_pos = current_pos;
                }
                lbutton_was_down = is_lbutton_down;
            }
        }
    });
}
