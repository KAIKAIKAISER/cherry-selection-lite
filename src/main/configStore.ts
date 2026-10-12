import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { AppConfig, ProviderItem, ActionItem } from './types';

const DEFAULT_PROVIDERS: ProviderItem[] = [
  {
    id: 'tokenhub',
    name: 'TokenHub',
    icon: 'cloud',
    apiKey: '',
    baseUrl: 'https://tokenhub.tencentmaas.com/v1',
    enabled: true,
    docUrl: 'https://cloud.tencent.com',
    models: [
      { id: 'hunyuan-mt2-pro', name: 'Hunyuan MT2 Pro', group: 'hy', enabled: true },
    ],
  },
  {
    id: 'deepseek',
    name: '深度求索 (DeepSeek)',
    icon: 'whale',
    apiKey: '',
    baseUrl: 'https://api.deepseek.com/v1',
    enabled: true,
    docUrl: 'https://platform.deepseek.com',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek-V3', group: 'deepseek', enabled: true },
      { id: 'deepseek-reasoner', name: 'DeepSeek-R1', group: 'deepseek', enabled: true },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: 'google',
    apiKey: '',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    enabled: false,
    docUrl: 'https://ai.google.dev',
    models: [
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', group: 'google', enabled: true },
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', group: 'google', enabled: true },
    ],
  },
  {
    id: 'amd',
    name: 'AMD GPU Cloud',
    icon: 'cpu',
    apiKey: '',
    baseUrl: 'https://api.amdcloud.com/v1',
    enabled: false,
    models: [{ id: 'llama3.3-70b', name: 'Llama 3.3 70B', group: 'amd', enabled: true }],
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: 'sparkles',
    apiKey: '',
    baseUrl: 'https://api.antigravity.ai/v1',
    enabled: false,
    models: [{ id: 'agy-coder-pro', name: 'AGY Coder Pro', group: 'agy', enabled: true }],
  },
  {
    id: 'cherryin',
    name: 'CherryIN',
    icon: 'cherry',
    apiKey: '',
    baseUrl: 'https://api.cherry-ai.com/v1',
    enabled: false,
    models: [{ id: 'qwen-turbo', name: 'Qwen Turbo', group: 'cherry', enabled: true }],
  },
  {
    id: 'silicon',
    name: '硅基流动 (SiliconFlow)',
    icon: 'layers',
    apiKey: '',
    baseUrl: 'https://api.siliconflow.cn/v1',
    enabled: false,
    docUrl: 'https://siliconflow.cn',
    models: [
      { id: 'deepseek-ai/DeepSeek-V3', name: 'DeepSeek V3', group: 'silicon', enabled: true },
      { id: 'Qwen/Qwen2.5-72B-Instruct', name: 'Qwen 2.5 72B', group: 'silicon', enabled: true },
    ],
  },
  {
    id: 'aihubmix',
    name: 'AiHubMix',
    icon: 'box',
    apiKey: '',
    baseUrl: 'https://aihubmix.com/v1',
    enabled: false,
    models: [{ id: 'gpt-4o-mini', name: 'GPT-4o Mini', group: 'openai', enabled: true }],
  },
  {
    id: 'ocoolai',
    name: 'ocoolAI',
    icon: 'zap',
    apiKey: '',
    baseUrl: 'https://api.ocoolai.com/v1',
    enabled: false,
    models: [{ id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', group: 'anthropic', enabled: true }],
  },
  {
    id: 'zhipu',
    name: '智谱开放平台',
    icon: 'brain',
    apiKey: '',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    enabled: false,
    docUrl: 'https://open.bigmodel.cn',
    models: [{ id: 'glm-4-plus', name: 'GLM 4 Plus', group: 'zhipu', enabled: true }],
  },
  {
    id: 'alayanew',
    name: 'Alaya NeW',
    icon: 'globe',
    apiKey: '',
    baseUrl: 'https://api.alayanew.com/v1',
    enabled: false,
    models: [{ id: 'alaya-general', name: 'Alaya General', group: 'alaya', enabled: true }],
  },
  {
    id: 'dmxapi',
    name: 'DMXAPI',
    icon: 'database',
    apiKey: '',
    baseUrl: 'https://api.dmxapi.com/v1',
    enabled: false,
    models: [{ id: 'gpt-4o', name: 'GPT-4o', group: 'openai', enabled: true }],
  },
  {
    id: 'aionly',
    name: '唯一AI (AiOnly)',
    icon: 'activity',
    apiKey: '',
    baseUrl: 'https://api.aionly.net/v1',
    enabled: false,
    models: [{ id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', group: 'anthropic', enabled: true }],
  },
  {
    id: 'burncloud',
    name: 'BurnCloud',
    icon: 'flame',
    apiKey: '',
    baseUrl: 'https://api.burncloud.com/v1',
    enabled: false,
    models: [{ id: 'deepseek-chat', name: 'DeepSeek Chat', group: 'deepseek', enabled: true }],
  },
  {
    id: '302ai',
    name: '302.AI',
    icon: 'hash',
    apiKey: '',
    baseUrl: 'https://api.302.ai/v1',
    enabled: false,
    models: [{ id: 'gpt-4o-mini', name: 'GPT-4o Mini', group: 'openai', enabled: true }],
  },
  {
    id: 'lanyun',
    name: '蓝转科技',
    icon: 'terminal',
    apiKey: '',
    baseUrl: 'https://api.lanyun.net/v1',
    enabled: false,
    models: [{ id: 'deepseek-v3', name: 'DeepSeek V3', group: 'deepseek', enabled: true }],
  },
  {
    id: 'ph8',
    name: 'PH8',
    icon: 'code',
    apiKey: '',
    baseUrl: 'https://api.ph8.com/v1',
    enabled: false,
    models: [{ id: 'deepseek-chat', name: 'DeepSeek Chat', group: 'deepseek', enabled: true }],
  },
  {
    id: 'ollama',
    name: 'Ollama 本地大模型',
    icon: 'laptop',
    apiKey: '',
    baseUrl: 'http://localhost:11434/v1',
    enabled: false,
    models: [{ id: 'llama3.2:latest', name: 'Llama 3.2', group: 'ollama', enabled: true }],
  },
];

const DEFAULT_ACTIONS: ActionItem[] = [
  {
    id: 'translate',
    name: '翻译',
    icon: 'languages',
    prompt:
      '你是一个精通多语言的翻译大师。请将以下选中的文本翻译为中文（如果原文已经是中文，请翻译为地道流利的英文）。仅输出翻译结果，无需附带多余解释，保留原文格式与专业术语：\n\n{{text}}',
    enabled: true,
    isBuiltIn: true,
  },
  {
    id: 'explain',
    name: '解释',
    icon: 'file-question',
    prompt:
      '请用简洁、清晰且易懂的语言解释以下选中的内容，拆解其中的专业术语、核心逻辑或关键背景：\n\n{{text}}',
    enabled: true,
    isBuiltIn: true,
  },
  {
    id: 'summary',
    name: '总结',
    icon: 'scan-text',
    prompt: '请将以下文本提炼为精炼的核心摘要，提炼重点要点，字数尽量简明扼要：\n\n{{text}}',
    enabled: true,
    isBuiltIn: true,
  },
  {
    id: 'search',
    name: '搜索',
    icon: 'search',
    prompt: '',
    enabled: true,
    isBuiltIn: true,
    searchEngine: 'Google|https://www.google.com/search?q={{queryString}}',
  },
  {
    id: 'copy',
    name: '复制',
    icon: 'clipboard-copy',
    prompt: '',
    enabled: true,
    isBuiltIn: true,
  },
  {
    id: 'refine',
    name: '优化',
    icon: 'wand-sparkles',
    prompt:
      '你是一位资深文本编辑。请对以下文本进行深度润色与语言优化，消除语病，改善语气和表达流畅度，使其更具专业感：\n\n{{text}}',
    enabled: false,
    isBuiltIn: true,
  },
  {
    id: 'quote',
    name: '引用',
    icon: 'quote',
    prompt: '',
    enabled: false,
    isBuiltIn: true,
  },
];

const DEFAULT_CONFIG: AppConfig = {
  providers: DEFAULT_PROVIDERS,
  defaultAssistantModel: {
    providerId: 'tokenhub',
    modelId: 'hunyuan-mt2-pro',
    modelName: 'Hunyuan MT2 Pro',
  },
  defaultTranslateModel: {
    providerId: 'tokenhub',
    modelId: 'hunyuan-mt2-pro',
    modelName: 'Hunyuan MT2 Pro',
  },
  selection: {
    enabled: true,
    triggerMode: 'ctrlkey', // Matching user's Cherry Studio settings (Ctrl 键模式)
    shortcut: 'Alt+S',
    compact: false,
    filterList: [],
    filterMode: 'default',
  },
  actionWindow: {
    followToolbar: true,
    rememberWinSize: false,
    autoClose: false,
    autoPin: false,
    opacity: 100,
    width: 480,
    height: 540,
  },
  actions: DEFAULT_ACTIONS,
  theme: 'system',
};

class ConfigStore {
  private configPath: string;
  private config: AppConfig;

  constructor() {
    const userDataPath = app?.getPath ? app.getPath('userData') : process.cwd();
    this.configPath = path.join(userDataPath, 'cherry-selection-lite-config.json');
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
    try {
      if (fs.existsSync(this.configPath)) {
        const raw = fs.readFileSync(this.configPath, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          selection: { ...DEFAULT_CONFIG.selection, ...(parsed.selection || {}) },
          actionWindow: { ...DEFAULT_CONFIG.actionWindow, ...(parsed.actionWindow || {}) },
          providers: parsed.providers && parsed.providers.length > 0 ? parsed.providers : DEFAULT_CONFIG.providers,
          actions: parsed.actions && parsed.actions.length > 0 ? parsed.actions : DEFAULT_CONFIG.actions,
        };
      }
    } catch (e) {
      console.error('Failed to load local config, trying Cherry Studio import:', e);
    }

    return this.importFromCherryStudioIfAvailable();
  }

  private importFromCherryStudioIfAvailable(): AppConfig {
    const config = { ...DEFAULT_CONFIG };
    const cherrySqlitePath = path.join(
      process.env.APPDATA || '',
      'CherryStudio',
      'cherrystudio.sqlite'
    );

    // If local cherrystudio sqlite exists, try quick import
    if (fs.existsSync(cherrySqlitePath)) {
      try {
        console.log('[ConfigStore] Detected existing Cherry Studio sqlite database at', cherrySqlitePath);
      } catch (e) {
        console.warn('[ConfigStore] Error importing sqlite:', e);
      }
    }

    return config;
  }

  public get(): AppConfig {
    return this.config;
  }

  public set(newConfig: Partial<AppConfig>): AppConfig {
    this.config = {
      ...this.config,
      ...newConfig,
      selection: { ...this.config.selection, ...(newConfig.selection || {}) },
      actionWindow: { ...this.config.actionWindow, ...(newConfig.actionWindow || {}) },
      providers: newConfig.providers || this.config.providers,
      actions: newConfig.actions || this.config.actions,
    };
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save config:', e);
    }
    return this.config;
  }
}

export const configStore = new ConfigStore();
