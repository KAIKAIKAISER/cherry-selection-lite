import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { AppConfig } from './types';

const DEFAULT_CONFIG: AppConfig = {
  provider: {
    name: 'OpenAI Compatible (Default: DeepSeek)',
    baseUrl: 'https://api.deepseek.com/v1',
    apiKey: '',
    model: 'deepseek-chat',
    temperature: 0.7,
    maxTokens: 2048,
  },
  selection: {
    enabled: true,
    triggerMode: 'selection',
    shortcut: 'Alt+S',
    compactMode: false,
    blacklist: ['devenv.exe', 'cmd.exe', 'powershell.exe'],
    minSelectionLength: 1,
  },
  actionWindow: {
    followToolbar: true,
    rememberSize: true,
    autoClose: true,
    autoPin: false,
    opacity: 100,
    width: 460,
    height: 520,
  },
  actions: [
    {
      id: 'translate',
      name: '翻译',
      icon: 'Languages',
      prompt: '你是一个精通多语言的翻译大师。请将以下选中的文本翻译为中文（如果原文已经是中文，请翻译为地道流利的英文）。仅输出翻译结果，无需附带多余解释，保留原文格式与专业术语：\n\n{{text}}',
      enabled: true,
    },
    {
      id: 'explain',
      name: '解释',
      icon: 'HelpCircle',
      prompt: '请用简洁、清晰且易懂的语言解释以下选中的内容，拆解其中的专业术语、核心逻辑或关键背景：\n\n{{text}}',
      enabled: true,
    },
    {
      id: 'summarize',
      name: '总结',
      icon: 'FileText',
      prompt: '请将以下文本提炼为精炼的核心摘要，提炼重点要点，字数尽量简明扼要：\n\n{{text}}',
      enabled: true,
    },
    {
      id: 'refine',
      name: '润色',
      icon: 'Sparkles',
      prompt: '你是一位资深文本编辑。请对以下文本进行深度润色与语言优化，消除语病，改善语气和表达流畅度，使其更具专业感：\n\n{{text}}',
      enabled: true,
    },
    {
      id: 'code',
      name: '代码解析',
      icon: 'Code2',
      prompt: '请分析以下代码片段，说明其主要功能、实现逻辑、涉及的技术点，以及是否存在潜在的性能或边界问题：\n\n```\n{{text}}\n```',
      enabled: true,
    },
  ],
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
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load config file, falling back to defaults:', e);
    }
    return { ...DEFAULT_CONFIG };
  }

  public get(): AppConfig {
    return this.config;
  }

  public set(newConfig: Partial<AppConfig>): AppConfig {
    this.config = {
      ...this.config,
      ...newConfig,
      provider: { ...this.config.provider, ...(newConfig.provider || {}) },
      selection: { ...this.config.selection, ...(newConfig.selection || {}) },
      actionWindow: { ...this.config.actionWindow, ...(newConfig.actionWindow || {}) },
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
