import React, { useEffect, useState, useMemo } from 'react';
import {
  Server,
  MousePointer,
  Settings as SettingsIcon,
  Search,
  Plus,
  Eye,
  EyeOff,
  RotateCw,
  Check,
  AlertCircle,
  HelpCircle,
  FileText,
  ExternalLink,
  Trash2,
  Undo2,
  Sparkles,
  Languages,
  Code,
  Copy,
  Sliders,
  X,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { AppConfig, ProviderItem, ProviderModel, ActionItem } from '../types';
import { ProviderIcon } from '../components/ProviderIcon';
import { ActionIcon } from '../components/ActionIcon';
import { Switch } from '../components/Switch';
import { BUILTIN_PROVIDERS } from '../data/builtinProviders';

export const SettingsWindow: React.FC = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'providers' | 'selection' | 'general'>('providers');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('deepseek');
  const [providerSearch, setProviderSearch] = useState<string>('');
  const [providerFilterTab, setProviderFilterTab] = useState<'all' | 'enabled' | 'custom'>('all');
  const [modelSearch, setModelSearch] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  // Statuses
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; latency?: number; message?: string }>({
    loading: false,
  });
  const [syncStatus, setSyncStatus] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<{ message: string; success: boolean } | null>(null);

  // Modals
  const [showCustomProviderModal, setShowCustomProviderModal] = useState<boolean>(false);
  const [customProviderForm, setCustomProviderForm] = useState({ id: '', name: '', baseUrl: '', apiKey: '' });

  const [showRestoreModal, setShowRestoreModal] = useState<boolean>(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);

  const [showAddModelModal, setShowAddModelModal] = useState<boolean>(false);
  const [newModelForm, setNewModelForm] = useState({ id: '', name: '', group: 'custom' });

  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);

  useEffect(() => {
    window.electronAPI.getConfig().then((cfg) => {
      // Merge with builtin providers if needed
      const deleted = cfg.deletedProviderIds || [];
      const currentMap = new Map((cfg.providers || []).map((p) => [p.id, p]));

      // Ensure built-in providers exist in list unless deleted
      for (const bp of BUILTIN_PROVIDERS) {
        if (!deleted.includes(bp.id) && !currentMap.has(bp.id)) {
          currentMap.set(bp.id, bp);
        }
      }

      // Auto-enable any provider that already has an API key configured or is custom
      for (const p of currentMap.values()) {
        if (!p.isBuiltIn && p.enabled === undefined) {
          p.enabled = true;
        }
        if (p.apiKey && p.apiKey.trim().length > 0 && !p.enabled) {
          p.enabled = true;
        }
      }

      const mergedProviders = Array.from(currentMap.values());
      const updatedConfig = { ...cfg, providers: mergedProviders, deletedProviderIds: deleted };

      setConfig(updatedConfig);
      saveConfig(updatedConfig);
      if (mergedProviders.length > 0 && !currentMap.has(selectedProviderId)) {
        setSelectedProviderId(mergedProviders[0].id);
      }
    });
  }, []);

  const saveConfig = async (newCfg: AppConfig) => {
    setConfig(newCfg);
    await window.electronAPI.setConfig(newCfg);
  };

  // Filtered providers list
  const filteredProviders = useMemo(() => {
    if (!config) return [];
    return config.providers.filter((p) => {
      // Deleted check
      if (config.deletedProviderIds?.includes(p.id)) return false;

      // Filter tab
      if (providerFilterTab === 'enabled') {
        const isCustom = !p.isBuiltIn;
        const hasKey = Boolean(p.apiKey && p.apiKey.trim().length > 0);
        const isLocal = p.id === 'ollama' || p.baseUrl?.includes('localhost') || p.baseUrl?.includes('127.0.0.1');
        if (!p.enabled && !hasKey && !isLocal && !isCustom) return false;
      }
      if (providerFilterTab === 'custom' && p.isBuiltIn) return false;

      // Search
      if (providerSearch.trim()) {
        const query = providerSearch.toLowerCase();
        return p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query);
      }
      return true;
    });
  }, [config, providerFilterTab, providerSearch]);

  const selectedProvider = useMemo(() => {
    if (!config) return null;
    return config.providers.find((p) => p.id === selectedProviderId) || filteredProviders[0] || null;
  }, [config, selectedProviderId, filteredProviders]);

  // Deleted built-in providers available for restore
  const deletedBuiltins = useMemo(() => {
    if (!config) return [];
    const deletedIds = new Set(config.deletedProviderIds || []);
    return BUILTIN_PROVIDERS.filter((p) => deletedIds.has(p.id));
  }, [config]);

  // All enabled models across all enabled / custom providers for default selection
  const allEnabledModels = useMemo(() => {
    if (!config) return [];
    const deletedIds = config.deletedProviderIds || [];
    return config.providers
      .filter((p) => {
        if (deletedIds.includes(p.id)) return false;
        const isCustom = !p.isBuiltIn;
        const hasKey = Boolean(p.apiKey && p.apiKey.trim().length > 0);
        const isLocal = p.id === 'ollama' || p.baseUrl?.includes('localhost') || p.baseUrl?.includes('127.0.0.1');
        return p.enabled || isCustom || hasKey || isLocal;
      })
      .flatMap((p) => {
        let active = (p.models || []).filter((m) => m.enabled !== false);
        if (active.length === 0 && (p.models || []).length > 0) {
          active = p.models;
        }
        if (active.length === 0) {
          active = [{ id: 'default', name: `${p.name} (默认模型)` }];
        }
        return active.map((m) => ({
          providerId: p.id,
          providerName: p.name,
          modelId: m.id,
          modelName: m.name || m.id,
        }));
      });
  }, [config]);

  // Provider update helper
  const updateCurrentProvider = (patch: Partial<ProviderItem>) => {
    if (!config || !selectedProvider) return;
    const updatedProviders = config.providers.map((p) => {
      if (p.id === selectedProvider.id) {
        const next = { ...p, ...patch };
        if (patch.apiKey && patch.apiKey.trim().length > 0 && next.enabled === false && patch.enabled === undefined) {
          next.enabled = true;
        }
        return next;
      }
      return p;
    });
    saveConfig({ ...config, providers: updatedProviders });
  };

  // Test Connection
  const handleTestConnection = async () => {
    if (!selectedProvider) return;
    setTestStatus({ loading: true });
    try {
      const res = await window.electronAPI.testProvider({
        baseUrl: selectedProvider.baseUrl,
        apiKey: selectedProvider.apiKey,
        modelId: selectedProvider.models[0]?.id,
      });
      setTestStatus({
        loading: false,
        success: res.success,
        latency: res.latencyMs,
        message: res.message,
      });
    } catch (err: any) {
      setTestStatus({
        loading: false,
        success: false,
        message: err.message || '连接测试异常',
      });
    }
  };

  // Fetch Models
  const handleSyncModels = async () => {
    if (!selectedProvider) return;
    setSyncStatus(true);
    setSyncFeedback(null);
    try {
      const res = await window.electronAPI.syncModels({
        baseUrl: selectedProvider.baseUrl,
        apiKey: selectedProvider.apiKey,
        providerId: selectedProvider.id,
      });
      if (res.success && res.models?.length > 0) {
        const newModels: ProviderModel[] = res.models.map((m) => ({
          id: m.id,
          name: m.name || m.id,
          group: selectedProvider.id,
          enabled: true,
        }));
        updateCurrentProvider({ models: newModels });
        setSyncFeedback({
          success: true,
          message: `成功同步 ${newModels.length} 个可用模型`,
        });
      } else {
        setSyncFeedback({
          success: false,
          message: res.message || '获取模型列表失败，请检查 Base URL 与 API Key',
        });
      }
    } catch (err: any) {
      setSyncFeedback({
        success: false,
        message: err.message || '获取模型列表失败',
      });
    } finally {
      setSyncStatus(false);
    }
  };

  // Delete Provider (Works for both built-in and custom)
  const handleDeleteProvider = () => {
    if (!config || !selectedProvider) return;
    const isBuiltIn = selectedProvider.isBuiltIn ?? true;
    const deletedIds = [...(config.deletedProviderIds || [])];

    if (isBuiltIn && !deletedIds.includes(selectedProvider.id)) {
      deletedIds.push(selectedProvider.id);
    }

    const remainingProviders = config.providers.filter((p) => p.id !== selectedProvider.id);
    setShowDeleteConfirmModal(false);

    saveConfig({
      ...config,
      providers: remainingProviders,
      deletedProviderIds: deletedIds,
    });

    if (remainingProviders.length > 0) {
      setSelectedProviderId(remainingProviders[0].id);
    }
  };

  // Restore Builtin Provider
  const handleRestoreProvider = (providerId: string) => {
    if (!config) return;
    const builtin = BUILTIN_PROVIDERS.find((p) => p.id === providerId);
    if (!builtin) return;

    const newDeleted = (config.deletedProviderIds || []).filter((id) => id !== providerId);
    const newProviders = [...config.providers.filter((p) => p.id !== providerId), builtin];

    saveConfig({
      ...config,
      providers: newProviders,
      deletedProviderIds: newDeleted,
    });
    setSelectedProviderId(providerId);
  };

  // Add Custom Provider
  const handleAddCustomProvider = () => {
    if (!config || !customProviderForm.name.trim() || !customProviderForm.baseUrl.trim()) return;
    const name = customProviderForm.name.trim();
    const id = customProviderForm.id.trim() || `custom-${Date.now()}`;
    const newProvider: ProviderItem = {
      id,
      name,
      baseUrl: customProviderForm.baseUrl.trim(),
      apiKey: customProviderForm.apiKey.trim(),
      enabled: true,
      isBuiltIn: false,
      models: [{ id: 'default', name: `${name} (默认模型)`, group: id, enabled: true }],
    };
    saveConfig({
      ...config,
      providers: [newProvider, ...config.providers.filter((p) => p.id !== id)],
    });
    setSelectedProviderId(id);
    setShowCustomProviderModal(false);
    setCustomProviderForm({ id: '', name: '', baseUrl: '', apiKey: '' });
  };

  if (!config) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-500 text-sm">
        <RotateCw className="w-5 h-5 animate-spin mr-2" /> 正在加载 Cherry Studio 设置...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-sans select-none overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-56 shrink-0 bg-white dark:bg-zinc-850 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-3">
        <div className="flex flex-col gap-1">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-3 py-3 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-sm leading-tight text-zinc-900 dark:text-white">Cherry Studio</div>
              <div className="text-[11px] text-zinc-400">划词助手设置</div>
            </div>
          </div>

          {/* Navigation Items */}
          <button
            onClick={() => setActiveMainTab('providers')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeMainTab === 'providers'
                ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Server className="w-4 h-4 shrink-0" />
            <span>模型服务商</span>
            <span className="ml-auto text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-full">
              {config.providers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('selection')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeMainTab === 'selection'
                ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <MousePointer className="w-4 h-4 shrink-0" />
            <span>划词助手</span>
          </button>

          <button
            onClick={() => setActiveMainTab('general')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeMainTab === 'general'
                ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <SettingsIcon className="w-4 h-4 shrink-0" />
            <span>通用设置</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="px-3 py-2 text-[11px] text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
          <div>Cherry Selection Lite</div>
          <div className="text-[10px] text-zinc-500">v1.0.4 (Windows 优化版)</div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* TAB 1: PROVIDER SETTINGS */}
        {activeMainTab === 'providers' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Middle: Provider List */}
            <div className="w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-850 flex flex-col">
              {/* Search & Tabs */}
              <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
                  <input
                    type="text"
                    value={providerSearch}
                    onChange={(e) => setProviderSearch(e.target.value)}
                    placeholder="搜索服务商..."
                    className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 transition-colors"
                  />
                  {providerSearch && (
                    <button
                      onClick={() => setProviderSearch('')}
                      className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs">
                  <button
                    onClick={() => setProviderFilterTab('all')}
                    className={`flex-1 py-1 text-center rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      providerFilterTab === 'all'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    全部
                  </button>
                  <button
                    onClick={() => setProviderFilterTab('enabled')}
                    className={`flex-1 py-1 text-center rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      providerFilterTab === 'enabled'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    已启用
                  </button>
                  <button
                    onClick={() => setProviderFilterTab('custom')}
                    className={`flex-1 py-1 text-center rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      providerFilterTab === 'custom'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    自定义
                  </button>
                </div>
              </div>

              {/* Provider List Items */}
              <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60 p-1.5">
                {filteredProviders.map((provider) => {
                  const isSelected = selectedProvider?.id === provider.id;
                  return (
                    <div
                      key={provider.id}
                      onClick={() => {
                        setSelectedProviderId(provider.id);
                        setTestStatus({ loading: false });
                        setSyncFeedback(null);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <ProviderIcon id={provider.id} name={provider.name} className="w-5 h-5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs truncate font-medium flex items-center gap-1.5">
                          <span>{provider.name}</span>
                          {provider.enabled && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="已启用" />
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate">
                          {provider.models.length} 个模型
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredProviders.length === 0 && (
                  <div className="p-6 text-center text-xs text-zinc-400">
                    未找到匹配的服务商
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="p-2.5 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
                <button
                  onClick={() => setShowCustomProviderModal(true)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>添加自定义</span>
                </button>

                {deletedBuiltins.length > 0 && (
                  <button
                    onClick={() => setShowRestoreModal(true)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    title={`回收站：有 ${deletedBuiltins.length} 个已删除的服务商`}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-zinc-500" />
                    <span>回收站 ({deletedBuiltins.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Selected Provider Details */}
            {selectedProvider ? (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50 dark:bg-zinc-900">
                {/* Header Card */}
                <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <ProviderIcon id={selectedProvider.id} name={selectedProvider.name} className="w-9 h-9 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base text-zinc-900 dark:text-white">
                          {selectedProvider.name}
                        </span>
                        {selectedProvider.isBuiltIn && (
                          <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">
                            内置服务商
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-400 flex items-center gap-3 mt-1">
                        {selectedProvider.website?.official && (
                          <a
                            href={selectedProvider.website.official}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-rose-500 flex items-center gap-1"
                          >
                            <span>官网</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {selectedProvider.website?.apiKey && (
                          <a
                            href={selectedProvider.website.apiKey}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-rose-500 flex items-center gap-1"
                          >
                            <span>获取 API Key</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {selectedProvider.website?.docs && (
                          <a
                            href={selectedProvider.website.docs}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-rose-500 flex items-center gap-1"
                          >
                            <span>文档</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowDeleteConfirmModal(true)}
                      className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="删除此服务商"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-700" />
                    <Switch
                      checked={selectedProvider.enabled}
                      onChange={(checked) => updateCurrentProvider({ enabled: checked })}
                    />
                  </div>
                </div>

                {/* API Configuration Card */}
                <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">API 接口与凭据</div>

                  {/* API Key */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-500 font-medium">API 密钥 (API Key)</label>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={selectedProvider.apiKey}
                        onChange={(e) => updateCurrentProvider({ apiKey: e.target.value })}
                        placeholder="sk-..."
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Base URL */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-zinc-500 font-medium">服务接口地址 (Base URL)</label>
                      {selectedProvider.defaultBaseUrl && selectedProvider.baseUrl !== selectedProvider.defaultBaseUrl && (
                        <button
                          onClick={() => updateCurrentProvider({ baseUrl: selectedProvider.defaultBaseUrl })}
                          className="text-[11px] text-rose-500 hover:underline cursor-pointer"
                        >
                          恢复默认地址
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={selectedProvider.baseUrl}
                      onChange={(e) => updateCurrentProvider({ baseUrl: e.target.value })}
                      placeholder="https://api.openai.com/v1"
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-500 dark:focus:border-rose-500"
                    />
                  </div>

                  {/* Test Connection Button & Status */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleTestConnection}
                        disabled={testStatus.loading}
                        className="shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${testStatus.loading ? 'animate-spin' : ''}`} />
                        <span>测试连接</span>
                      </button>

                      {testStatus.loading && (
                        <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                          正在测试接口响应...
                        </span>
                      )}
                    </div>

                    {testStatus.message && (
                      <div
                        className={`p-3 rounded-lg text-xs flex items-start gap-2.5 border transition-all ${
                          testStatus.success
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {testStatus.success ? (
                          <Check className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                        )}
                        <div className="flex-1 space-y-1 overflow-hidden min-w-0">
                          <div className="font-semibold flex items-center gap-2">
                            <span>{testStatus.success ? '连接测试正常' : '连接测试未通过'}</span>
                          </div>
                          <div className="font-mono text-[11px] leading-relaxed break-all select-text opacity-90">
                            {testStatus.message}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Model List Section */}
                <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">可用模型列表</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        共 {selectedProvider.models.length} 个模型已配置
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSyncModels}
                        disabled={syncStatus}
                        className="shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${syncStatus ? 'animate-spin' : ''}`} />
                        <span>获取模型列表</span>
                      </button>

                      <button
                        onClick={() => setShowAddModelModal(true)}
                        className="shrink-0 whitespace-nowrap flex items-center gap-1 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>添加模型</span>
                      </button>
                    </div>
                  </div>

                  {syncFeedback && (
                    <div
                      className={`p-3 rounded-lg text-xs flex items-start gap-2.5 border transition-all ${
                        syncFeedback.success
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {syncFeedback.success ? (
                        <Check className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                      )}
                      <div className="flex-1 space-y-1 overflow-hidden min-w-0">
                        <div className="font-semibold">
                          {syncFeedback.success ? '模型列表同步成功' : '模型列表获取失败'}
                        </div>
                        <div className="font-mono text-[11px] leading-relaxed break-all select-text opacity-90">
                          {syncFeedback.message}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Model Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      placeholder="搜索模型名称或标识符..."
                      className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:border-rose-500 dark:focus:border-rose-500"
                    />
                  </div>

                  {/* Models Table */}
                  <div className="border border-zinc-100 dark:border-zinc-800 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800/80 max-h-72 overflow-y-auto">
                    {selectedProvider.models
                      .filter((m) =>
                        modelSearch
                          ? m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
                            m.id.toLowerCase().includes(modelSearch.toLowerCase())
                          : true
                      )
                      .map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center justify-between px-3.5 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-xs"
                        >
                          <div className="flex flex-col min-w-0 pr-3">
                            <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">{model.name}</span>
                            <span className="text-[10px] text-zinc-400 font-mono truncate">{model.id}</span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <Switch
                              checked={model.enabled !== false}
                              onChange={(checked) => {
                                const newModels = selectedProvider.models.map((m) =>
                                  m.id === model.id ? { ...m, enabled: checked } : m
                                );
                                updateCurrentProvider({ models: newModels });
                              }}
                            />
                            <button
                              onClick={() => {
                                const newModels = selectedProvider.models.filter((m) => m.id !== model.id);
                                updateCurrentProvider({ models: newModels });
                              }}
                              className="text-zinc-400 hover:text-red-500 cursor-pointer"
                              title="删除模型"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                    {selectedProvider.models.length === 0 && (
                      <div className="p-8 text-center text-xs text-zinc-400">
                        暂无模型，点击右上角「获取模型列表」或「添加模型」
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-400 text-xs">
                请在左侧选择一个服务商
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SELECTION ASSISTANT SETTINGS */}
        {activeMainTab === 'selection' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50 dark:bg-zinc-900">
            {/* Master Toggle */}
            <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-zinc-900 dark:text-white">启用划词助手 (Selection Assistant)</div>
                <div className="text-xs text-zinc-400 mt-0.5">选中文本时显示浮动工具栏，快速唤出 AI 动作</div>
              </div>
              <Switch
                checked={config.selection.enabled}
                onChange={(checked) =>
                  saveConfig({
                    ...config,
                    selection: { ...config.selection, enabled: checked },
                  })
                }
              />
            </div>

            {/* Interaction Settings */}
            <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
              <div className="text-xs font-semibold text-zinc-900 dark:text-white">交互与触发方式</div>

              {/* Trigger Mode */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">触发模式</div>
                  <div className="text-[11px] text-zinc-400">选择划选文本时的工具栏弹出时机</div>
                </div>
                <select
                  value={config.selection.triggerMode}
                  onChange={(e) =>
                    saveConfig({
                      ...config,
                      selection: { ...config.selection, triggerMode: e.target.value as any },
                    })
                  }
                  className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-rose-500"
                >
                  <option value="ctrlkey">防误触：选中文本后按 Ctrl 唤出</option>
                  <option value="selection">即时：划词选中文本后立即弹出</option>
                  <option value="shortcut">快捷键：仅按全局快捷键唤出</option>
                </select>
              </div>

              {/* Global Shortcut */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">唤醒全局快捷键</div>
                  <div className="text-[11px] text-zinc-400">在任意 Windows 应用中抓取选中文本并弹出工具栏</div>
                </div>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded font-mono text-xs border border-zinc-200 dark:border-zinc-700">
                  {config.selection.shortcut || 'Alt+S'}
                </span>
              </div>

              {/* Compact Mode */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">紧凑模式 (Compact Toolbar)</div>
                  <div className="text-[11px] text-zinc-400">工具栏仅展示图标，不展示文字标签</div>
                </div>
                <Switch
                  checked={config.selection.compact}
                  onChange={(checked) =>
                    saveConfig({
                      ...config,
                      selection: { ...config.selection, compact: checked },
                    })
                  }
                />
              </div>

              {/* Auto Pin */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">结果窗口自动置顶 (Auto Pin)</div>
                  <div className="text-[11px] text-zinc-400">动作结果窗口默认保持在其他窗口之上</div>
                </div>
                <Switch
                  checked={config.actionWindow.autoPin}
                  onChange={(checked) =>
                    saveConfig({
                      ...config,
                      actionWindow: { ...config.actionWindow, autoPin: checked },
                    })
                  }
                />
              </div>

              {/* Follow Toolbar */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">结果窗口跟随工具栏位置</div>
                  <div className="text-[11px] text-zinc-400">点击动作后结果窗口在工具栏下方就近展开</div>
                </div>
                <Switch
                  checked={config.actionWindow.followToolbar}
                  onChange={(checked) =>
                    saveConfig({
                      ...config,
                      actionWindow: { ...config.actionWindow, followToolbar: checked },
                    })
                  }
                />
              </div>
            </div>

            {/* Model Defaults Settings */}
            <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
              <div className="text-xs font-semibold text-zinc-900 dark:text-white">默认 AI 模型设置</div>

              {/* Default Assistant Model */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">默认助手模型</div>
                  <div className="text-[11px] text-zinc-400">常规划词动作（核心总结、深度润色、代码解析等）默认调用的模型</div>
                </div>
                <select
                  value={`${config.defaultAssistantModel?.providerId || ''}:::${config.defaultAssistantModel?.modelId || ''}`}
                  onChange={(e) => {
                    const [pId, mId] = e.target.value.split(':::');
                    const target = allEnabledModels.find((x) => x.providerId === pId && x.modelId === mId);
                    if (target) {
                      saveConfig({
                        ...config,
                        defaultAssistantModel: {
                          providerId: target.providerId,
                          modelId: target.modelId,
                          modelName: target.modelName,
                        },
                      });
                    }
                  }}
                  className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-rose-500 max-w-[260px] truncate"
                >
                  {allEnabledModels.length === 0 ? (
                    <option value="">暂无可用模型，请先在模型服务中启用并配置 API Key</option>
                  ) : (
                    allEnabledModels.map((m) => (
                      <option key={`ast-${m.providerId}-${m.modelId}`} value={`${m.providerId}:::${m.modelId}`}>
                        {m.providerName} - {m.modelName}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Default Translate Model */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">默认翻译模型</div>
                  <div className="text-[11px] text-zinc-400">划词助手「智能翻译」动作默认调用的专用模型</div>
                </div>
                <select
                  value={`${config.defaultTranslateModel?.providerId || ''}:::${config.defaultTranslateModel?.modelId || ''}`}
                  onChange={(e) => {
                    const [pId, mId] = e.target.value.split(':::');
                    const target = allEnabledModels.find((x) => x.providerId === pId && x.modelId === mId);
                    if (target) {
                      saveConfig({
                        ...config,
                        defaultTranslateModel: {
                          providerId: target.providerId,
                          modelId: target.modelId,
                          modelName: target.modelName,
                        },
                      });
                    }
                  }}
                  className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-rose-500 max-w-[260px] truncate"
                >
                  {allEnabledModels.length === 0 ? (
                    <option value="">暂无可用模型，请先在模型服务中启用并配置 API Key</option>
                  ) : (
                    allEnabledModels.map((m) => (
                      <option key={`tra-${m.providerId}-${m.modelId}`} value={`${m.providerId}:::${m.modelId}`}>
                        {m.providerName} - {m.modelName}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Action Items Manager */}
            <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">快捷动作栏管理</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">启用、禁用、排序或自定义 Prompt 动作</div>
                </div>

                <button
                  onClick={() => {
                    setEditingAction({
                      id: `custom-${Date.now()}`,
                      name: '',
                      icon: 'sparkles',
                      prompt: '{{text}}',
                      enabled: true,
                      isBuiltIn: false,
                    });
                    setShowActionModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>添加自定义动作</span>
                </button>
              </div>

              <div className="border border-zinc-100 dark:border-zinc-800 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {config.actions.map((act, index) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between px-3.5 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <ActionIcon id={act.id} className="w-4 h-4 text-zinc-500" />
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">{act.name}</span>
                      {act.isBuiltIn && (
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-400 px-1.5 py-0.2 rounded">
                          内置
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (index === 0) return;
                          const newActions = [...config.actions];
                          const temp = newActions[index - 1];
                          newActions[index - 1] = newActions[index];
                          newActions[index] = temp;
                          saveConfig({ ...config, actions: newActions });
                        }}
                        disabled={index === 0}
                        className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 cursor-pointer"
                        title="上移"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (index === config.actions.length - 1) return;
                          const newActions = [...config.actions];
                          const temp = newActions[index + 1];
                          newActions[index + 1] = newActions[index];
                          newActions[index] = temp;
                          saveConfig({ ...config, actions: newActions });
                        }}
                        disabled={index === config.actions.length - 1}
                        className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 cursor-pointer"
                        title="下移"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setEditingAction(act);
                          setShowActionModal(true);
                        }}
                        className="p-1 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                        title="编辑 Prompt"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>

                      <Switch
                        checked={act.enabled}
                        onChange={(checked) => {
                          const newActions = config.actions.map((a) => (a.id === act.id ? { ...a, enabled: checked } : a));
                          saveConfig({ ...config, actions: newActions });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GENERAL SETTINGS */}
        {activeMainTab === 'general' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50 dark:bg-zinc-900">
            <div className="bg-white dark:bg-zinc-850 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
              <div className="text-xs font-semibold text-zinc-900 dark:text-white">外观与主题</div>

              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">色彩模式</div>
                  <div className="text-[11px] text-zinc-400">浅色、深色或随系统自动切换</div>
                </div>

                <div className="flex gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs">
                  {(['light', 'dark', 'system'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => saveConfig({ ...config, theme: t })}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        config.theme === t
                          ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                          : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                      }`}
                    >
                      {t === 'light' ? '浅色' : t === 'dark' ? '深色' : '跟随系统'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: ADD CUSTOM PROVIDER */}
      {showCustomProviderModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-850 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">添加自定义服务商</span>
              <button
                onClick={() => setShowCustomProviderModal(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 font-medium block mb-1">服务商名称</label>
                <input
                  type="text"
                  value={customProviderForm.name}
                  onChange={(e) => setCustomProviderForm({ ...customProviderForm, name: e.target.value })}
                  placeholder="例如：OneAPI, Local AI"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-500 font-medium block mb-1">Base URL</label>
                <input
                  type="text"
                  value={customProviderForm.baseUrl}
                  onChange={(e) => setCustomProviderForm({ ...customProviderForm, baseUrl: e.target.value })}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-500 font-medium block mb-1">API Key</label>
                <input
                  type="password"
                  value={customProviderForm.apiKey}
                  onChange={(e) => setCustomProviderForm({ ...customProviderForm, apiKey: e.target.value })}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCustomProviderModal(false)}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleAddCustomProvider}
                className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RECYCLE BIN FOR DELETED PROVIDERS */}
      {showRestoreModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-850 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm">回收站</span>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    共有 {deletedBuiltins.length} 个已删除服务商，可随时还原
                  </div>
                </div>
              </div>
              <button onClick={() => setShowRestoreModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800 border border-zinc-100 dark:border-zinc-800 rounded-lg">
              {deletedBuiltins.map((bp) => (
                <div key={bp.id} className="flex items-center justify-between p-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <ProviderIcon id={bp.id} name={bp.name} className="w-5 h-5 shrink-0" />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{bp.name}</span>
                  </div>

                  <button
                    onClick={() => handleRestoreProvider(bp.id)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-md text-xs font-medium cursor-pointer transition-colors"
                  >
                    <Undo2 className="w-3 h-3 text-zinc-500" />
                    <span>还原</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  for (const bp of deletedBuiltins) {
                    handleRestoreProvider(bp.id);
                  }
                  setShowRestoreModal(false);
                }}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium cursor-pointer"
              >
                全部还原
              </button>
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium cursor-pointer"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CONFIRM DELETE PROVIDER */}
      {showDeleteConfirmModal && selectedProvider && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-850 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 shadow-xl space-y-3 animate-in fade-in zoom-in-95">
            <span className="font-semibold text-sm text-red-500">删除服务商确认</span>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              确定要删除服务商 <span className="font-semibold text-zinc-900 dark:text-white">{selectedProvider.name}</span> 吗？
              {selectedProvider.isBuiltIn && '（内置服务商删除后，可随时在「回收站」中找回）'}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleDeleteProvider}
                className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD MODEL */}
      {showAddModelModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-850 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 shadow-xl space-y-3 animate-in fade-in zoom-in-95">
            <span className="font-semibold text-sm">添加新模型</span>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 font-medium block mb-1">模型 ID (如 gpt-4o, claude-3-sonnet)</label>
                <input
                  type="text"
                  value={newModelForm.id}
                  onChange={(e) => setNewModelForm({ ...newModelForm, id: e.target.value })}
                  placeholder="model-id"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-500 font-medium block mb-1">显示名称</label>
                <input
                  type="text"
                  value={newModelForm.name}
                  onChange={(e) => setNewModelForm({ ...newModelForm, name: e.target.value })}
                  placeholder="如 GPT-4o"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModelModal(false)}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (!newModelForm.id.trim() || !selectedProvider) return;
                  const newModel: ProviderModel = {
                    id: newModelForm.id.trim(),
                    name: newModelForm.name.trim() || newModelForm.id.trim(),
                    group: selectedProvider.id,
                    enabled: true,
                  };
                  const existing = (selectedProvider.models || []).filter((m) => m.id !== newModel.id);
                  updateCurrentProvider({ models: [newModel, ...existing], enabled: true });
                  setShowAddModelModal(false);
                  setNewModelForm({ id: '', name: '', group: 'custom' });
                }}
                className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: EDIT ACTION PROMPT */}
      {showActionModal && editingAction && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-850 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 shadow-xl space-y-3 animate-in fade-in zoom-in-95">
            <span className="font-semibold text-sm">编辑动作 Prompt</span>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 font-medium block mb-1">动作名称</label>
                <input
                  type="text"
                  value={editingAction.name}
                  onChange={(e) => setEditingAction({ ...editingAction, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-500 font-medium block mb-1">
                  提示词 Prompt 模板（使用 <span className="font-mono text-rose-500">{`{{text}}`}</span> 代表选中文本）
                </label>
                <textarea
                  rows={6}
                  value={editingAction.prompt}
                  onChange={(e) => setEditingAction({ ...editingAction, prompt: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-medium cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => {
                  const exists = config.actions.some((a) => a.id === editingAction.id);
                  const updatedActions = exists
                    ? config.actions.map((a) => (a.id === editingAction.id ? editingAction : a))
                    : [...config.actions, editingAction];
                  saveConfig({ ...config, actions: updatedActions });
                  setShowActionModal(false);
                }}
                className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
