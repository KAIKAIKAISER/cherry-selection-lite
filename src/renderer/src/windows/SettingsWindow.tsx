import React, { useEffect, useState } from 'react';
import {
  Server,
  MousePointer,
  Sparkles,
  Palette,
  Save,
  Check,
  Plus,
  Trash2,
  AlertCircle,
  Eye,
  EyeOff,
  Zap,
} from 'lucide-react';
import { ActionPrompt, AppConfig } from '../types';

export const SettingsWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'provider' | 'selection' | 'actions' | 'theme'>('provider');
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [saved, setSaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false,
  });

  // New action dialog state
  const [newAction, setNewAction] = useState<Partial<ActionPrompt>>({
    name: '',
    prompt: '{{text}}',
    enabled: true,
  });
  const [showAddAction, setShowAddAction] = useState(false);

  useEffect(() => {
    window.electronAPI.getConfig().then((cfg) => {
      setConfig(cfg);
    });
  }, []);

  if (!config) {
    return <div className="p-8 text-xs text-zinc-500">加载配置中...</div>;
  }

  const handleSave = async () => {
    await window.electronAPI.setConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePresetSelect = (presetKey: string) => {
    let baseUrl = config.provider.baseUrl;
    let model = config.provider.model;

    if (presetKey === 'deepseek') {
      baseUrl = 'https://api.deepseek.com/v1';
      model = 'deepseek-chat';
    } else if (presetKey === 'openai') {
      baseUrl = 'https://api.openai.com/v1';
      model = 'gpt-4o-mini';
    } else if (presetKey === 'siliconflow') {
      baseUrl = 'https://api.siliconflow.cn/v1';
      model = 'deepseek-ai/DeepSeek-V3';
    } else if (presetKey === 'ollama') {
      baseUrl = 'http://localhost:11434/v1';
      model = 'llama3.2:latest';
    } else if (presetKey === 'openrouter') {
      baseUrl = 'https://openrouter.ai/api/v1';
      model = 'deepseek/deepseek-chat';
    }

    setConfig({
      ...config,
      provider: {
        ...config.provider,
        name: presetKey,
        baseUrl,
        model,
      },
    });
  };

  const handleTestConnection = async () => {
    setTestStatus({ loading: true });
    try {
      const url = config.provider.baseUrl.endsWith('/')
        ? `${config.provider.baseUrl}chat/completions`
        : `${config.provider.baseUrl}/chat/completions`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.provider.apiKey}`,
        },
        body: JSON.stringify({
          model: config.provider.model,
          messages: [{ role: 'user', content: 'Hi' }],
          max_tokens: 5,
        }),
      });

      if (res.ok) {
        setTestStatus({ loading: false, success: true, message: 'API 接口验证成功！网络与模型正常。' });
      } else {
        const errorText = await res.text();
        setTestStatus({ loading: false, success: false, message: `请求失败 [${res.status}]: ${errorText}` });
      }
    } catch (e: any) {
      setTestStatus({ loading: false, success: false, message: `连接异常: ${e.message}` });
    }
  };

  const handleToggleAction = (id: string) => {
    const nextActions = config.actions.map((a) =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    );
    setConfig({ ...config, actions: nextActions });
  };

  const handlePromptChange = (id: string, newPrompt: string) => {
    const nextActions = config.actions.map((a) =>
      a.id === id ? { ...a, prompt: newPrompt } : a
    );
    setConfig({ ...config, actions: nextActions });
  };

  const handleDeleteAction = (id: string) => {
    const nextActions = config.actions.filter((a) => a.id !== id);
    setConfig({ ...config, actions: nextActions });
  };

  const handleAddCustomAction = () => {
    if (!newAction.name) return;
    const id = `custom_${Date.now()}`;
    const actionToAdd: ActionPrompt = {
      id,
      name: newAction.name,
      icon: 'Sparkles',
      prompt: newAction.prompt || '{{text}}',
      enabled: true,
    };
    setConfig({ ...config, actions: [...config.actions, actionToAdd] });
    setShowAddAction(false);
    setNewAction({ name: '', prompt: '{{text}}', enabled: true });
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 select-none">
      {/* Sidebar */}
      <div className="w-52 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6 px-2">
            <span className="text-xl">🍒</span>
            <div>
              <h1 className="font-bold text-sm text-zinc-900 dark:text-white leading-none">
                Cherry Selection
              </h1>
              <span className="text-[10px] text-zinc-400 font-medium">Lite v1.0.0</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('provider')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'provider'
                  ? 'bg-cherry-50 dark:bg-cherry-950/40 text-cherry-600 dark:text-cherry-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>模型与 API 服务</span>
            </button>

            <button
              onClick={() => setActiveTab('selection')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'selection'
                  ? 'bg-cherry-50 dark:bg-cherry-950/40 text-cherry-600 dark:text-cherry-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <MousePointer className="w-4 h-4" />
              <span>划词与交互</span>
            </button>

            <button
              onClick={() => setActiveTab('actions')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'actions'
                  ? 'bg-cherry-50 dark:bg-cherry-950/40 text-cherry-600 dark:text-cherry-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Prompt 动作管理</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'theme'
                  ? 'bg-cherry-50 dark:bg-cherry-950/40 text-cherry-600 dark:text-cherry-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>界面与关于</span>
            </button>
          </nav>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cherry-500 hover:bg-cherry-600 text-white font-medium text-xs shadow-sm transition-colors"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? '已保存设置' : '保存更改'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Tab 1: Provider & Model */}
        {activeTab === 'provider' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">API 服务与模型接入</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                支持任何 OpenAI Compatible API（DeepSeek、硅基流动、Ollama、OneAPI 等）
              </p>
            </div>

            {/* Quick Provider Presets */}
            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                快速接入预设
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'deepseek', label: 'DeepSeek' },
                  { id: 'siliconflow', label: '硅基流动 (SiliconFlow)' },
                  { id: 'openai', label: 'OpenAI 官方' },
                  { id: 'ollama', label: 'Ollama 本地' },
                  { id: 'openrouter', label: 'OpenRouter' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePresetSelect(item.id)}
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cherry-400 text-left font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Base URL */}
            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                API Base URL
              </label>
              <input
                type="text"
                value={config.provider.baseUrl}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    provider: { ...config.provider, baseUrl: e.target.value },
                  })
                }
                placeholder="https://api.deepseek.com/v1"
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-cherry-500 font-mono"
              />
            </div>

            {/* API Key */}
            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={config.provider.apiKey}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      provider: { ...config.provider, apiKey: e.target.value },
                    })
                  }
                  placeholder="sk-..."
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-cherry-500 font-mono pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Model Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                  模型名称 (Model)
                </label>
                <input
                  type="text"
                  value={config.provider.model}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      provider: { ...config.provider, model: e.target.value },
                    })
                  }
                  placeholder="deepseek-chat"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-cherry-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                  采样温度 (Temperature: {config.provider.temperature})
                </label>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.1"
                  value={config.provider.temperature}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      provider: {
                        ...config.provider,
                        temperature: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="w-full accent-cherry-500 mt-2"
                />
              </div>
            </div>

            {/* Connection Test */}
            <div className="pt-2">
              <button
                onClick={handleTestConnection}
                disabled={testStatus.loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-medium transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{testStatus.loading ? '正在验证连接...' : '测试 API 连通性'}</span>
              </button>

              {testStatus.message && (
                <div
                  className={`mt-2 p-2.5 rounded-lg text-xs leading-relaxed flex items-start gap-2 ${
                    testStatus.success
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{testStatus.message}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Selection & Toolbar */}
        {activeTab === 'selection' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">划词助手与交互配置</h2>
              <p className="text-xs text-zinc-400 mt-0.5">控制文本选中后的弹出逻辑与界面行为</p>
            </div>

            {/* Enable switch */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div>
                <span className="text-xs font-semibold block">启用划词助手</span>
                <span className="text-[11px] text-zinc-400">在任何应用程序中选中文本即可触发</span>
              </div>
              <input
                type="checkbox"
                checked={config.selection.enabled}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    selection: { ...config.selection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 accent-cherry-500 cursor-pointer"
              />
            </div>

            {/* Trigger Mode */}
            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                触发方式 (Trigger Mode)
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'selection', title: '划词即显', desc: '选中文本立即弹出' },
                  { id: 'ctrl', title: 'Ctrl 键模式', desc: '划词 + 按住 Ctrl 键' },
                  { id: 'shortcut', title: '快捷键触发', desc: '选中文本后按快捷键' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() =>
                      setConfig({
                        ...config,
                        selection: {
                          ...config.selection,
                          triggerMode: mode.id as any,
                        },
                      })
                    }
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      config.selection.triggerMode === mode.id
                        ? 'border-cherry-500 bg-cherry-50/50 dark:bg-cherry-950/30 text-cherry-600 dark:text-cherry-400'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400'
                    }`}
                  >
                    <div className="font-semibold text-xs">{mode.title}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Shortcut config */}
            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                唤起快捷键
              </label>
              <input
                type="text"
                value={config.selection.shortcut}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    selection: { ...config.selection, shortcut: e.target.value },
                  })
                }
                placeholder="Alt+S"
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-cherry-500 font-mono"
              />
            </div>

            {/* Compact mode */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div>
                <span className="text-xs font-semibold block">紧凑工具栏模式</span>
                <span className="text-[11px] text-zinc-400">仅显示操作图标，节省屏幕空间</span>
              </div>
              <input
                type="checkbox"
                checked={config.selection.compactMode}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    selection: {
                      ...config.selection,
                      compactMode: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 accent-cherry-500 cursor-pointer"
              />
            </div>

            {/* Action Window Settings */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold block text-zinc-700 dark:text-zinc-300">
                结果窗口行为 (Action Window)
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-600 dark:text-zinc-400">紧随工具栏吸附显示</span>
                <input
                  type="checkbox"
                  checked={config.actionWindow.followToolbar}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      actionWindow: {
                        ...config.actionWindow,
                        followToolbar: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-cherry-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-600 dark:text-zinc-400">点击窗口外自动关闭</span>
                <input
                  type="checkbox"
                  checked={config.actionWindow.autoClose}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      actionWindow: {
                        ...config.actionWindow,
                        autoClose: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-cherry-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-600 dark:text-zinc-400">默认固定置顶 (Auto Pin)</span>
                <input
                  type="checkbox"
                  checked={config.actionWindow.autoPin}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      actionWindow: {
                        ...config.actionWindow,
                        autoPin: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-cherry-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Actions & Prompts */}
        {activeTab === 'actions' && (
          <div className="max-w-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Prompt 动作管理</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  自定义工具栏的动作按钮及对应 AI 提示词（使用 {'{{text}}'} 代表选中文本）
                </p>
              </div>

              <button
                onClick={() => setShowAddAction(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cherry-500 hover:bg-cherry-600 text-white text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新建动作</span>
              </button>
            </div>

            {/* Add action modal */}
            {showAddAction && (
              <div className="p-3.5 rounded-xl border border-cherry-300 dark:border-cherry-800 bg-white dark:bg-zinc-900 space-y-2.5">
                <span className="text-xs font-bold block text-cherry-600 dark:text-cherry-400">
                  添加自定义 Prompt 动作
                </span>
                <input
                  type="text"
                  placeholder="动作名称 (如: 代码润色)"
                  value={newAction.name}
                  onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-cherry-500"
                />
                <textarea
                  rows={3}
                  placeholder="Prompt 模板，如: 请将以下内容润色：\n\n{{text}}"
                  value={newAction.prompt}
                  onChange={(e) => setNewAction({ ...newAction, prompt: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2.5 text-xs outline-none focus:border-cherry-500 font-mono"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddAction(false)}
                    className="px-2.5 py-1 rounded-lg text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddCustomAction}
                    className="px-3 py-1 rounded-lg bg-cherry-500 text-white text-xs font-medium"
                  >
                    添加
                  </button>
                </div>
              </div>
            )}

            {/* List of actions */}
            <div className="space-y-3">
              {config.actions.map((action) => (
                <div
                  key={action.id}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={action.enabled}
                        onChange={() => handleToggleAction(action.id)}
                        className="w-3.5 h-3.5 accent-cherry-500 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">{action.name}</span>
                    </div>

                    {action.id.startsWith('custom_') && (
                      <button
                        onClick={() => handleDeleteAction(action.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                        title="删除自定义动作"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={2}
                    value={action.prompt}
                    onChange={(e) => handlePromptChange(action.id, e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-xs outline-none focus:border-cherry-500 font-mono leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Theme & About */}
        {activeTab === 'theme' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">外观与关于</h2>
              <p className="text-xs text-zinc-400 mt-0.5">个性化主题与项目信息</p>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-2">
                色彩主题
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'system', label: '跟随系统' },
                  { id: 'light', label: '浅色模式' },
                  { id: 'dark', label: '深色模式' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setConfig({ ...config, theme: t.id as any })}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-colors ${
                      config.theme === t.id
                        ? 'border-cherry-500 bg-cherry-50 dark:bg-cherry-950/40 text-cherry-600 dark:text-cherry-400'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs space-y-2">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">
                关于 Cherry Selection Lite
              </span>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Cherry Selection Lite 是从 Cherry Studio 项目深度精简剥离出的独立划词助手应用。
                剔除了聊天界面、向量知识库、Agent 多智能体等庞大模块，保留纯粹的系统级划词交互体验、现代 UI 美学与高性能 OpenAI 兼容流式模型调用。
              </p>
              <div className="pt-2 text-[11px] text-zinc-400">
                开源协议: Apache-2.0 · 基于 Electron + React + TailwindCSS
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
