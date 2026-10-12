import React, { useEffect, useState } from 'react';
import {
  Server,
  MousePointer,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Key,
  Eye,
  EyeOff,
  RotateCw,
  Sliders,
  Check,
  AlertCircle,
  HelpCircle,
  GripVertical,
  Minus,
  FileText,
  CheckSquare,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { AppConfig, ProviderItem, ProviderModel, ActionItem } from '../types';
import { ProviderIcon } from '../components/ProviderIcon';
import { ActionIcon } from '../components/ActionIcon';
import { Switch } from '../components/Switch';

export const SettingsWindow: React.FC = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'providers' | 'selection' | 'general'>('selection');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('tokenhub');
  const [providerSearch, setProviderSearch] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false,
  });
  const [syncStatus, setSyncStatus] = useState<boolean>(false);

  // Custom Action Modal
  const [showCustomActionModal, setShowCustomActionModal] = useState<boolean>(false);
  const [customActionForm, setCustomActionForm] = useState({ name: '', prompt: '{{text}}' });

  // Add Model Modal
  const [showAddModelModal, setShowAddModelModal] = useState<boolean>(false);
  const [newModelForm, setNewModelForm] = useState({ id: '', name: '', group: 'default' });

  useEffect(() => {
    window.electronAPI.getConfig().then((cfg) => {
      setConfig(cfg);
      if (cfg.providers && cfg.providers.length > 0) {
        setSelectedProviderId(cfg.providers[0].id);
      }
    });
  }, []);

  const saveConfig = async (newCfg: AppConfig) => {
    setConfig(newCfg);
    await window.electronAPI.setConfig(newCfg);
  };

  if (!config) {
    return <div className="p-8 text-xs text-zinc-500">正在加载配置...</div>;
  }

  const selectedProvider =
    config.providers.find((p) => p.id === selectedProviderId) || config.providers[0];

  // Test Connection
  const handleTestConnection = async () => {
    if (!selectedProvider) return;
    setTestStatus({ loading: true });
    const res = await window.electronAPI.testProvider({
      baseUrl: selectedProvider.baseUrl,
      apiKey: selectedProvider.apiKey,
      modelId: selectedProvider.models[0]?.id || 'hunyuan-mt2-pro',
    });
    setTestStatus({ loading: false, success: res.success, message: res.message });
    setTimeout(() => {
      setTestStatus({ loading: false });
    }, 4000);
  };

  // Sync Models
  const handleSyncModels = async () => {
    if (!selectedProvider) return;
    setSyncStatus(true);
    const res = await window.electronAPI.syncModels({
      baseUrl: selectedProvider.baseUrl,
      apiKey: selectedProvider.apiKey,
    });
    setSyncStatus(false);
    if (res.success && res.models.length > 0) {
      const updatedProviders = config.providers.map((p) => {
        if (p.id === selectedProvider.id) {
          return {
            ...p,
            models: res.models.map((m: any) => ({
              id: m.id,
              name: m.name,
              group: 'synced',
              enabled: true,
            })),
          };
        }
        return p;
      });
      saveConfig({ ...config, providers: updatedProviders });
    }
  };

  // Toggle Provider Active
  const handleToggleProvider = (providerId: string, enabled: boolean) => {
    const updated = config.providers.map((p) => (p.id === providerId ? { ...p, enabled } : p));
    saveConfig({ ...config, providers: updated });
  };

  // Update Provider Details
  const handleUpdateProvider = (fields: Partial<ProviderItem>) => {
    const updated = config.providers.map((p) =>
      p.id === selectedProvider.id ? { ...p, ...fields } : p
    );
    saveConfig({ ...config, providers: updated });
  };

  // Add Model to Provider
  const handleAddModel = () => {
    if (!newModelForm.id) return;
    const newModel: ProviderModel = {
      id: newModelForm.id,
      name: newModelForm.name || newModelForm.id,
      group: newModelForm.group || 'custom',
      enabled: true,
    };
    const updated = config.providers.map((p) => {
      if (p.id === selectedProvider.id) {
        return { ...p, models: [...p.models, newModel] };
      }
      return p;
    });
    saveConfig({ ...config, providers: updated });
    setShowAddModelModal(false);
    setNewModelForm({ id: '', name: '', group: 'default' });
  };

  // Remove Model
  const handleRemoveModel = (modelId: string) => {
    const updated = config.providers.map((p) => {
      if (p.id === selectedProvider.id) {
        return { ...p, models: p.models.filter((m) => m.id !== modelId) };
      }
      return p;
    });
    saveConfig({ ...config, providers: updated });
  };

  // Action Ordering & Enable/Disable
  const enabledActions = config.actions.filter((a) => a.enabled);
  const disabledActions = config.actions.filter((a) => !a.enabled);

  const handleToggleActionEnabled = (actionId: string) => {
    const updatedActions = config.actions.map((a) =>
      a.id === actionId ? { ...a, enabled: !a.enabled } : a
    );
    saveConfig({ ...config, actions: updatedActions });
  };

  const handleMoveAction = (index: number, direction: 'up' | 'down') => {
    const currentEnabled = [...enabledActions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentEnabled.length) return;

    const temp = currentEnabled[index];
    currentEnabled[index] = currentEnabled[targetIndex];
    currentEnabled[targetIndex] = temp;

    const finalActions = [...currentEnabled, ...disabledActions];
    saveConfig({ ...config, actions: finalActions });
  };

  const handleCreateCustomAction = () => {
    if (!customActionForm.name.trim()) return;
    const newAct: ActionItem = {
      id: `custom_${Date.now()}`,
      name: customActionForm.name,
      icon: 'sparkles',
      prompt: customActionForm.prompt,
      enabled: true,
      isBuiltIn: false,
    };
    saveConfig({ ...config, actions: [...config.actions, newAct] });
    setShowCustomActionModal(false);
    setCustomActionForm({ name: '', prompt: '{{text}}' });
  };

  const filteredProviders = config.providers.filter((p) =>
    p.name.toLowerCase().includes(providerSearch.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 select-none font-sans text-xs">
      {/* Primary Vertical Left Nav */}
      <div className="w-16 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/80 flex flex-col items-center py-4 justify-between shrink-0">
        <div className="flex flex-col items-center gap-6">
          <div className="text-xl select-none" title="Cherry Selection Lite">
            🍒
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveMainTab('providers')}
              className={`p-2.5 rounded-xl transition-colors flex flex-col items-center gap-1 ${
                activeMainTab === 'providers'
                  ? 'bg-white dark:bg-zinc-800 text-cherry-500 dark:text-cherry-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="模型服务"
            >
              <Server className="w-5 h-5" />
              <span className="text-[10px] font-medium scale-90">服务</span>
            </button>

            <button
              onClick={() => setActiveMainTab('selection')}
              className={`p-2.5 rounded-xl transition-colors flex flex-col items-center gap-1 ${
                activeMainTab === 'selection'
                  ? 'bg-white dark:bg-zinc-800 text-cherry-500 dark:text-cherry-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="划词助手"
            >
              <MousePointer className="w-5 h-5" />
              <span className="text-[10px] font-medium scale-90">划词</span>
            </button>

            <button
              onClick={() => setActiveMainTab('general')}
              className={`p-2.5 rounded-xl transition-colors flex flex-col items-center gap-1 ${
                activeMainTab === 'general'
                  ? 'bg-white dark:bg-zinc-800 text-cherry-500 dark:text-cherry-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="通用设置"
            >
              <Settings className="w-5 h-5" />
              <span className="text-[10px] font-medium scale-90">设置</span>
            </button>
          </div>
        </div>

        <div className="text-[10px] text-zinc-400 font-mono">v1.0.1</div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 模型服务 (IMAGE 1 EXACT CLONE) */}
      {/* ========================================================================= */}
      {activeMainTab === 'providers' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Sub-sidebar: Provider List */}
          <div className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col shrink-0">
            {/* Search Header */}
            <div className="p-3 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="搜索模型平台..."
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 pl-8 pr-2 py-1.5 rounded-lg text-xs outline-none focus:ring-1 focus:ring-cherry-500 border border-transparent"
                />
              </div>
              <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Provider List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
              {filteredProviders.map((provider) => {
                const isSelected = provider.id === selectedProviderId;
                return (
                  <div
                    key={provider.id}
                    onClick={() => setSelectedProviderId(provider.id)}
                    className={`group flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <GripVertical className="w-3 h-3 text-zinc-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ProviderIcon id={provider.id} name={provider.name} />
                      <span className="text-xs truncate max-w-[110px]">{provider.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {provider.enabled && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
                      )}
                      <MoreVertical className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Provider Button */}
            <div className="p-3 border-t border-zinc-100 dark:border-zinc-800/60">
              <button
                onClick={() => {
                  const id = `custom_${Date.now()}`;
                  const newP: ProviderItem = {
                    id,
                    name: '新服务商',
                    apiKey: '',
                    baseUrl: 'https://api.openai.com/v1',
                    enabled: false,
                    models: [{ id: 'gpt-4o', name: 'GPT-4o', group: 'default', enabled: true }],
                  };
                  saveConfig({ ...config, providers: [...config.providers, newP] });
                  setSelectedProviderId(id);
                }}
                className="w-full py-1.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-medium text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>添加服务商</span>
              </button>
            </div>
          </div>

          {/* Right Detail Pane */}
          {selectedProvider && (
            <div className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-950 flex flex-col space-y-6 max-w-2xl">
              {/* Header: Name, Gear, Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    {selectedProvider.name}
                  </h2>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Switch
                  checked={selectedProvider.enabled}
                  onChange={(val) => handleToggleProvider(selectedProvider.id, val)}
                />
              </div>

              {/* API 密钥 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    API 密钥
                  </label>
                  {selectedProvider.docUrl && (
                    <button
                      onClick={() => window.electronAPI.openExternal(selectedProvider.docUrl!)}
                      className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <span>获取密钥</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={selectedProvider.apiKey}
                      onChange={(e) => handleUpdateProvider({ apiKey: e.target.value })}
                      placeholder="sk-..."
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:ring-1 focus:ring-cherry-500 pr-16"
                    />
                    <div className="absolute right-2 top-2 flex items-center gap-1.5 text-zinc-400">
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="hover:text-zinc-600 dark:hover:text-zinc-200"
                      >
                        {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <Key className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                  </div>

                  <button
                    onClick={handleTestConnection}
                    disabled={testStatus.loading}
                    className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-1 shadow-xs transition-colors shrink-0"
                  >
                    {testStatus.loading ? (
                      <RotateCw className="w-3.5 h-3.5 animate-spin text-cherry-500" />
                    ) : (
                      <span>检测</span>
                    )}
                  </button>
                </div>

                {testStatus.message && (
                  <div
                    className={`mt-1.5 p-2 rounded-md text-[11px] flex items-center gap-1.5 ${
                      testStatus.success
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {testStatus.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{testStatus.message}</span>
                  </div>
                )}
              </div>

              {/* API 地址 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    API 地址
                  </label>
                  <span className="text-xs text-blue-500 hover:underline cursor-pointer">
                    添加端点
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={selectedProvider.baseUrl}
                    onChange={(e) => handleUpdateProvider({ baseUrl: e.target.value })}
                    placeholder="https://api.openai.com/v1"
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:ring-1 focus:ring-cherry-500 pr-8"
                  />
                  <button className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 模型 (Models) Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-xs text-zinc-800 dark:text-zinc-200">模型</span>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <FileText className="w-3.5 h-3.5 hover:text-zinc-600 cursor-pointer" />
                      <CheckSquare className="w-3.5 h-3.5 hover:text-zinc-600 cursor-pointer" />
                      <Search className="w-3.5 h-3.5 hover:text-zinc-600 cursor-pointer" />
                      <Filter className="w-3.5 h-3.5 hover:text-zinc-600 cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSyncModels}
                      disabled={syncStatus}
                      className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[11px] font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-1 shadow-xs"
                    >
                      <RotateCw className={`w-3 h-3 ${syncStatus ? 'animate-spin' : ''}`} />
                      <span>同步模型</span>
                    </button>
                    <button
                      onClick={() => setShowAddModelModal(true)}
                      className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 text-zinc-700 dark:text-zinc-200 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Model Groups */}
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  <div className="px-3 py-2 bg-zinc-50/70 dark:bg-zinc-800/40 flex items-center justify-between text-zinc-500 font-medium text-[11px]">
                    <span>⌄ hy (群组)</span>
                    <button className="text-zinc-400 hover:text-red-500">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {selectedProvider.models.map((m) => (
                    <div
                      key={m.id}
                      className="px-3.5 py-2.5 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[9px] font-bold">
                          ●
                        </span>
                        <span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                          {m.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-zinc-400">
                        <button className="hover:text-zinc-600 dark:hover:text-zinc-200">
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveModel(m.id)}
                          className="hover:text-red-500"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 划词助手 (IMAGE 2 EXACT CLONE) */}
      {/* ========================================================================= */}
      {activeMainTab === 'selection' && (
        <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
          {/* Top Section: 取词方式 & 紧凑模式 */}
          <div className="space-y-4">
            {/* 取词方式 */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">
                  取词方式
                </span>
                <HelpCircle className="w-3.5 h-3.5 text-zinc-400 cursor-pointer" />
              </div>
              <p className="text-[11px] text-zinc-400">划词后，触发取词并显示工具栏的方式</p>

              <div className="flex items-center gap-6 pt-1">
                {[
                  { id: 'selection', label: '划词' },
                  { id: 'ctrlkey', label: 'Ctrl 键' },
                  { id: 'shortcut', label: '快捷键' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    <input
                      type="radio"
                      name="triggerMode"
                      value={item.id}
                      checked={config.selection.triggerMode === item.id}
                      onChange={() =>
                        saveConfig({
                          ...config,
                          selection: { ...config.selection, triggerMode: item.id as any },
                        })
                      }
                      className="accent-emerald-500 w-3.5 h-3.5"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 紧凑模式 */}
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">
                  紧凑模式
                </span>
                <span className="text-[11px] text-zinc-400">紧凑模式下，只显示图标，不显示文字</span>
              </div>
              <Switch
                checked={config.selection.compact}
                onChange={(val) =>
                  saveConfig({
                    ...config,
                    selection: { ...config.selection, compact: val },
                  })
                }
              />
            </div>
          </div>

          {/* CARD 1: 功能窗口 (Window Settings) */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-4 space-y-4">
            <h3 className="font-bold text-xs text-zinc-900 dark:text-white">功能窗口</h3>

            {/* 跟随工具栏 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                  跟随工具栏
                </span>
                <span className="text-[11px] text-zinc-400">
                  窗口位置将跟随工具栏显示，禁用后则始终居中显示
                </span>
              </div>
              <Switch
                checked={config.actionWindow.followToolbar}
                onChange={(val) =>
                  saveConfig({
                    ...config,
                    actionWindow: { ...config.actionWindow, followToolbar: val },
                  })
                }
              />
            </div>

            {/* 记住大小 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                  记住大小
                </span>
                <span className="text-[11px] text-zinc-400">应用运行期间，窗口会按上次调整的大小显示</span>
              </div>
              <Switch
                checked={config.actionWindow.rememberWinSize}
                onChange={(val) =>
                  saveConfig({
                    ...config,
                    actionWindow: { ...config.actionWindow, rememberWinSize: val },
                  })
                }
              />
            </div>

            {/* 自动关闭 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                  自动关闭
                </span>
                <span className="text-[11px] text-zinc-400">
                  当窗口未置顶且失去焦点时，将自动关闭该窗口
                </span>
              </div>
              <Switch
                checked={config.actionWindow.autoClose}
                onChange={(val) =>
                  saveConfig({
                    ...config,
                    actionWindow: { ...config.actionWindow, autoClose: val },
                  })
                }
              />
            </div>

            {/* 自动置顶 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                  自动置顶
                </span>
                <span className="text-[11px] text-zinc-400">默认将窗口置于顶部</span>
              </div>
              <Switch
                checked={config.actionWindow.autoPin}
                onChange={(val) =>
                  saveConfig({
                    ...config,
                    actionWindow: { ...config.actionWindow, autoPin: val },
                  })
                }
              />
            </div>

            {/* 透明度 */}
            <div className="flex items-center justify-between pt-1">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                  透明度
                </span>
                <span className="text-[11px] text-zinc-400">
                  设置窗口的默认透明度，100% 为完全不透明
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-300">
                  {config.actionWindow.opacity}%
                </span>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={config.actionWindow.opacity}
                  onChange={(e) =>
                    saveConfig({
                      ...config,
                      actionWindow: {
                        ...config.actionWindow,
                        opacity: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-28 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* CARD 2: 功能 (Actions & Models) */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-zinc-900 dark:text-white">功能</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    // reset to defaults
                    window.location.reload();
                  }}
                  className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  重置
                </button>
                <button
                  onClick={() => setShowCustomActionModal(true)}
                  className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>自定义功能</span>
                </button>
              </div>
            </div>

            {/* 默认助手模型 */}
            <div className="flex items-center justify-between py-1">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                  默认助手模型
                </span>
                <span className="text-[11px] text-zinc-400">
                  用于解释、总结、润色，以及使用默认模型的自定义功能。
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-200 font-medium">
                  <span className="text-purple-500">🔮</span>
                  <span>{config.defaultAssistantModel.modelName}</span>
                </div>
                <button
                  onClick={() => setActiveMainTab('providers')}
                  className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>前往模型设置</span>
                </button>
              </div>
            </div>

            {/* 翻译模型 */}
            <div className="flex items-center justify-between py-1 border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                  翻译模型
                </span>
                <span className="text-[11px] text-zinc-400">
                  用于生成翻译结果；自动语言检测也可能使用快速模型。
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-200 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>{config.defaultTranslateModel.modelName}</span>
                </div>
                <button
                  onClick={() => setActiveMainTab('providers')}
                  className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>前往模型设置</span>
                </button>
              </div>
            </div>

            {/* Real-time Toolbar Preview (Center) */}
            <div className="py-4 flex flex-col items-center justify-center">
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-full px-3 py-1.5 flex items-center gap-3 shadow-md">
                <span className="text-base select-none">🍒</span>
                {enabledActions.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-200"
                  >
                    <ActionIcon id={act.id} className="w-3.5 h-3.5" />
                    {!config.selection.compact && <span>{act.name}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Enabled Actions List */}
            <div className="space-y-2">
              {enabledActions.map((act, index) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:border-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ActionIcon id={act.id} className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {act.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {act.id === 'search' && (
                      <span className="text-[11px] text-zinc-500 font-mono bg-zinc-200/60 dark:bg-zinc-700 px-2 py-0.5 rounded">
                        G Google
                      </span>
                    )}
                    <button className="text-zinc-400 hover:text-zinc-600 p-1">
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleActionEnabled(act.id)}
                      className="text-zinc-400 hover:text-red-500 text-xs px-2 py-0.5 rounded hover:bg-zinc-200/50"
                    >
                      停用
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="py-2 flex items-center gap-3 text-zinc-400 text-[11px]">
              <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
              <span>
                拖拽排序，移动到上方以启用功能 ({enabledActions.length}/{config.actions.length})
              </span>
              <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Disabled Staging Actions */}
            <div className="space-y-2 opacity-60">
              {disabledActions.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/30 dark:bg-zinc-800/20"
                >
                  <div className="flex items-center gap-3">
                    <ActionIcon id={act.id} className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-medium text-zinc-500">{act.name}</span>
                  </div>

                  <button
                    onClick={() => handleToggleActionEnabled(act.id)}
                    className="text-xs text-emerald-600 hover:underline px-2 py-0.5"
                  >
                    启用
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 通用设置 */}
      {/* ========================================================================= */}
      {activeMainTab === 'general' && (
        <div className="flex-1 overflow-y-auto p-8 max-w-xl space-y-6">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">外观与通用设置</h2>

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
                  onClick={() => saveConfig({ ...config, theme: t.id as any })}
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
              🍒 Cherry Selection Lite (Windows 专版)
            </span>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              基于 Cherry Studio Selection Assistant
              深度精简重构的独立划词工具，保留完整原生交互体验与模型服务体系。
            </p>
          </div>
        </div>
      )}

      {/* Modal: Custom Action */}
      {showCustomActionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-96 p-5 space-y-3 shadow-2xl">
            <h4 className="font-bold text-xs text-zinc-900 dark:text-white">添加自定义功能</h4>
            <div>
              <label className="text-[11px] text-zinc-500 block mb-1">功能名称</label>
              <input
                type="text"
                value={customActionForm.name}
                onChange={(e) => setCustomActionForm({ ...customActionForm, name: e.target.value })}
                placeholder="例如: 语法纠错"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-cherry-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-500 block mb-1">提示词模板 (包含 {'{{text}}'})</label>
              <textarea
                rows={4}
                value={customActionForm.prompt}
                onChange={(e) => setCustomActionForm({ ...customActionForm, prompt: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2.5 text-xs font-mono outline-none focus:ring-1 focus:ring-cherry-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCustomActionModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                取消
              </button>
              <button
                onClick={handleCreateCustomAction}
                className="px-3.5 py-1.5 rounded-lg bg-cherry-500 text-white text-xs font-medium hover:bg-cherry-600"
              >
                确定添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Model */}
      {showAddModelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-96 p-5 space-y-3 shadow-2xl">
            <h4 className="font-bold text-xs text-zinc-900 dark:text-white">添加模型</h4>
            <div>
              <label className="text-[11px] text-zinc-500 block mb-1">模型 ID</label>
              <input
                type="text"
                value={newModelForm.id}
                onChange={(e) => setNewModelForm({ ...newModelForm, id: e.target.value })}
                placeholder="例如: gpt-4o-mini"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none focus:ring-1 focus:ring-cherry-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-500 block mb-1">显示名称</label>
              <input
                type="text"
                value={newModelForm.name}
                onChange={(e) => setNewModelForm({ ...newModelForm, name: e.target.value })}
                placeholder="例如: GPT 4o Mini"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-cherry-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModelModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                取消
              </button>
              <button
                onClick={handleAddModel}
                className="px-3.5 py-1.5 rounded-lg bg-cherry-500 text-white text-xs font-medium hover:bg-cherry-600"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
