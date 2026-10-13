use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProviderModel {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub group: Option<String>,
    #[serde(default = "default_true")]
    pub enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProviderWebsite {
    #[serde(default)]
    pub official: Option<String>,
    #[serde(default)]
    pub api_key: Option<String>,
    #[serde(default)]
    pub docs: Option<String>,
    #[serde(default)]
    pub models: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProviderItem {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub description: Option<String>,
    pub base_url: String,
    #[serde(default)]
    pub default_base_url: Option<String>,
    #[serde(default)]
    pub api_key: String,
    #[serde(default)]
    pub proxy_url: Option<String>,
    #[serde(default = "default_false")]
    pub enabled: bool,
    #[serde(default = "default_false")]
    pub is_built_in: bool,
    #[serde(default)]
    pub website: Option<ProviderWebsite>,
    #[serde(default)]
    pub default_chat_endpoint: Option<String>,
    #[serde(default)]
    pub models: Vec<ProviderModel>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActionItem {
    pub id: String,
    pub name: String,
    pub icon: String,
    pub prompt: String,
    pub enabled: bool,
    #[serde(default = "default_false")]
    pub is_built_in: bool,
    #[serde(default)]
    pub search_engine: Option<String>,
    #[serde(default)]
    pub model_override: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DefaultModelSelection {
    pub provider_id: String,
    pub model_id: String,
    pub model_name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SelectionConfig {
    #[serde(default = "default_true")]
    pub enabled: bool,
    #[serde(default = "default_trigger_mode")]
    pub trigger_mode: String, // "selection" | "ctrlkey" | "shortcut"
    #[serde(default = "default_shortcut")]
    pub shortcut: String, // "Alt+S"
    #[serde(default = "default_false")]
    pub compact: bool,
    #[serde(default)]
    pub filter_list: Vec<String>,
    #[serde(default = "default_filter_mode")]
    pub filter_mode: String, // "default" | "include" | "exclude"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActionWindowConfig {
    #[serde(default = "default_true")]
    pub follow_toolbar: bool,
    #[serde(default = "default_false")]
    pub remember_win_size: bool,
    #[serde(default = "default_false")]
    pub auto_close: bool,
    #[serde(default = "default_false")]
    pub auto_pin: bool,
    #[serde(default = "default_opacity")]
    pub opacity: f64,
    #[serde(default = "default_width")]
    pub width: u32,
    #[serde(default = "default_height")]
    pub height: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppConfig {
    #[serde(default)]
    pub providers: Vec<ProviderItem>,
    #[serde(default)]
    pub deleted_provider_ids: Vec<String>,
    #[serde(default = "default_model_selection")]
    pub default_assistant_model: DefaultModelSelection,
    #[serde(default = "default_model_selection")]
    pub default_translate_model: DefaultModelSelection,
    #[serde(default)]
    pub selection: SelectionConfig,
    #[serde(default)]
    pub action_window: ActionWindowConfig,
    #[serde(default)]
    pub actions: Vec<ActionItem>,
    #[serde(default = "default_theme")]
    pub theme: String, // "system" | "light" | "dark"
}

fn default_true() -> bool { true }
fn default_false() -> bool { false }
fn default_trigger_mode() -> String { "ctrlkey".to_string() }
fn default_shortcut() -> String { "Alt+S".to_string() }
fn default_filter_mode() -> String { "default".to_string() }
fn default_opacity() -> f64 { 100.0 }
fn default_width() -> u32 { 520 }
fn default_height() -> u32 { 620 }
fn default_theme() -> String { "system".to_string() }

fn default_model_selection() -> DefaultModelSelection {
    DefaultModelSelection {
        provider_id: "deepseek".to_string(),
        model_id: "deepseek-chat".to_string(),
        model_name: "DeepSeek-V3".to_string(),
    }
}

impl Default for SelectionConfig {
    fn default() -> Self {
        Self {
            enabled: true,
            trigger_mode: default_trigger_mode(),
            shortcut: default_shortcut(),
            compact: false,
            filter_list: Vec::new(),
            filter_mode: default_filter_mode(),
        }
    }
}

impl Default for ActionWindowConfig {
    fn default() -> Self {
        Self {
            follow_toolbar: true,
            remember_win_size: false,
            auto_close: false,
            auto_pin: false,
            opacity: default_opacity(),
            width: default_width(),
            height: default_height(),
        }
    }
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            providers: Vec::new(),
            deleted_provider_ids: Vec::new(),
            default_assistant_model: default_model_selection(),
            default_translate_model: default_model_selection(),
            selection: SelectionConfig::default(),
            action_window: ActionWindowConfig::default(),
            actions: vec![
                ActionItem {
                    id: "translate".to_string(),
                    name: "智能翻译".to_string(),
                    icon: "languages".to_string(),
                    prompt: "请将以下选中文本准确流畅地翻译为中文（如果原文为中文则翻译为地道的英文），仅输出翻译结果：\n\n{{text}}".to_string(),
                    enabled: true,
                    is_built_in: true,
                    search_engine: None,
                    model_override: None,
                },
                ActionItem {
                    id: "explain".to_string(),
                    name: "概念解释".to_string(),
                    icon: "help-circle".to_string(),
                    prompt: "请对以下选中的概念或词汇进行深入浅出、条理清晰的解释说明：\n\n{{text}}".to_string(),
                    enabled: true,
                    is_built_in: true,
                    search_engine: None,
                    model_override: None,
                },
                ActionItem {
                    id: "summary".to_string(),
                    name: "核心总结".to_string(),
                    icon: "file-text".to_string(),
                    prompt: "请提炼以下内容的核心要点，使用清晰有条理的要点列表输出总结：\n\n{{text}}".to_string(),
                    enabled: true,
                    is_built_in: true,
                    search_engine: None,
                    model_override: None,
                },
                ActionItem {
                    id: "refine".to_string(),
                    name: "深度润色".to_string(),
                    icon: "sparkles".to_string(),
                    prompt: "请对以下文本进行专业级润色，优化措辞与表达结构，使其更加通顺精炼：\n\n{{text}}".to_string(),
                    enabled: true,
                    is_built_in: true,
                    search_engine: None,
                    model_override: None,
                },
                ActionItem {
                    id: "code".to_string(),
                    name: "代码解析".to_string(),
                    icon: "code".to_string(),
                    prompt: "请分析以下代码逻辑，指出关键实现、潜在优化点及边界问题：\n\n```\n{{text}}\n```".to_string(),
                    enabled: true,
                    is_built_in: true,
                    search_engine: None,
                    model_override: None,
                },
                ActionItem {
                    id: "copy".to_string(),
                    name: "复制内容".to_string(),
                    icon: "copy".to_string(),
                    prompt: "".to_string(),
                    enabled: true,
                    is_built_in: true,
                    search_engine: None,
                    model_override: None,
                },
            ],
            theme: default_theme(),
        }
    }
}

pub fn get_config_path() -> PathBuf {
    let mut path = dirs_next::data_dir().unwrap_or_else(|| PathBuf::from("."));
    path.push("CherryStudioSelectionLite");
    if !path.exists() {
        let _ = fs::create_dir_all(&path);
    }
    path.push("config.json");
    path
}

pub fn load_config() -> AppConfig {
    let path = get_config_path();
    if path.exists() {
        if let Ok(content) = fs::read_to_string(&path) {
            if let Ok(cfg) = serde_json::from_str::<AppConfig>(&content) {
                return cfg;
            }
        }
    }
    let default_cfg = AppConfig::default();
    let _ = save_config(&default_cfg);
    default_cfg
}

pub fn save_config(config: &AppConfig) -> Result<(), String> {
    let path = get_config_path();
    let json = serde_json::to_string_pretty(config).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())?;
    Ok(())
}

mod dirs_next {
    use std::path::PathBuf;
    pub fn data_dir() -> Option<PathBuf> {
        std::env::var_os("APPDATA").map(PathBuf::from)
    }
}
