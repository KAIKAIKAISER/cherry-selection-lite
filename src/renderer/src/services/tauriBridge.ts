import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { AppConfig, IElectronAPI, SelectionPayload, TestResult, SyncModelsResult } from '../types';
import { BUILTIN_PROVIDERS } from '../data/builtinProviders';

const isTauri = typeof window !== 'undefined' && Boolean(window.__TAURI_INTERNALS__);

const DEFAULT_CONFIG: AppConfig = {
  providers: BUILTIN_PROVIDERS,
  deletedProviderIds: [],
  defaultAssistantModel: {
    providerId: 'deepseek',
    modelId: 'deepseek-chat',
    modelName: 'DeepSeek-V3',
  },
  defaultTranslateModel: {
    providerId: 'deepseek',
    modelId: 'deepseek-chat',
    modelName: 'DeepSeek-V3',
  },
  selection: {
    enabled: true,
    triggerMode: 'ctrlkey',
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
    width: 520,
    height: 620,
  },
  actions: [
    {
      id: 'translate',
      name: '智能翻译',
      icon: 'languages',
      prompt: '请将以下选中文本准确流畅地翻译为中文（如果原文为中文则翻译为地道的英文），仅输出翻译结果：\n\n{{text}}',
      enabled: true,
      isBuiltIn: true,
    },
    {
      id: 'explain',
      name: '概念解释',
      icon: 'help-circle',
      prompt: '请对以下选中的概念或词汇进行深入浅出、条理清晰的解释说明：\n\n{{text}}',
      enabled: true,
      isBuiltIn: true,
    },
    {
      id: 'summary',
      name: '核心总结',
      icon: 'file-text',
      prompt: '请提炼以下内容的核心要点，使用清晰有条理的要点列表输出总结：\n\n{{text}}',
      enabled: true,
      isBuiltIn: true,
    },
    {
      id: 'refine',
      name: '深度润色',
      icon: 'sparkles',
      prompt: '请对以下文本进行专业级润色，优化措辞与表达结构，使其更加通顺精炼：\n\n{{text}}',
      enabled: true,
      isBuiltIn: true,
    },
    {
      id: 'code',
      name: '代码解析',
      icon: 'code',
      prompt: '请分析以下代码逻辑，指出关键实现、潜在优化点及边界问题：\n\n```\n{{text}}\n```',
      enabled: true,
      isBuiltIn: true,
    },
    {
      id: 'copy',
      name: '复制内容',
      icon: 'copy',
      prompt: '',
      enabled: true,
      isBuiltIn: true,
    },
  ],
  theme: 'system',
};

// Local storage key for fallback
const STORAGE_KEY = 'cherry_selection_lite_config';

function getLocalConfig(): AppConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all builtin providers are populated if not in deleted
      const deleted = parsed.deletedProviderIds || [];
      const currentIds = new Set(parsed.providers?.map((p: any) => p.id) || []);
      const missingBuiltins = BUILTIN_PROVIDERS.filter((p) => !currentIds.has(p.id) && !deleted.includes(p.id));
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        providers: [...(parsed.providers || []), ...missingBuiltins],
        deletedProviderIds: deleted,
      };
    }
  } catch (e) {
    console.error('Failed to parse local config', e);
  }
  return DEFAULT_CONFIG;
}

function saveLocalConfig(cfg: AppConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch (e) {
    console.error('Failed to save local config', e);
  }
}

export const bridge: IElectronAPI = {
  getConfig: async () => {
    if (isTauri) {
      try {
        const cfg = await invoke<AppConfig>('get_config');
        if (cfg && cfg.providers && cfg.providers.length > 0) {
          return cfg;
        }
      } catch (err) {
        console.warn('Tauri get_config error, falling back:', err);
      }
    }
    return getLocalConfig();
  },

  setConfig: async (patch: Partial<AppConfig>) => {
    const current = await bridge.getConfig();
    const updated: AppConfig = { ...current, ...patch };
    if (isTauri) {
      try {
        return await invoke<AppConfig>('set_config', { newConfig: updated });
      } catch (err) {
        console.warn('Tauri set_config error:', err);
      }
    }
    saveLocalConfig(updated);
    return updated;
  },

  testProvider: async (data) => {
    if (isTauri) {
      try {
        return await invoke<TestResult>('test_provider', {
          baseUrl: data.baseUrl,
          apiKey: data.apiKey,
          modelId: data.modelId,
        });
      } catch (err: any) {
        return { success: false, message: err.toString() };
      }
    }

    // Browser fallback test using fetch
    const start = Date.now();
    try {
      const trimmed = data.baseUrl.replace(/\/+$/, '');
      const url = trimmed.endsWith('/v1') ? `${trimmed}/chat/completions` : `${trimmed}/v1/chat/completions`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(data.apiKey ? { Authorization: `Bearer ${data.apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: data.modelId || 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 1,
        }),
      });
      const latencyMs = Date.now() - start;
      if (res.ok || res.status === 400 || res.status === 429) {
        return { success: true, latencyMs, message: `连接正常 (HTTP ${res.status}, 延迟 ${latencyMs}ms)` };
      }
      return { success: false, latencyMs, message: `HTTP ${res.status}: ${res.statusText}` };
    } catch (err: any) {
      return { success: false, message: `网络错误: ${err.message}` };
    }
  },

  syncModels: async (data) => {
    if (isTauri) {
      try {
        const models = await invoke<Array<{ id: string; name: string }>>('sync_models', {
          baseUrl: data.baseUrl,
          apiKey: data.apiKey,
          providerId: data.providerId || 'openai',
        });
        return { success: true, models };
      } catch (err: any) {
        return { success: false, models: [], message: err.toString() };
      }
    }

    // Browser fallback model sync
    try {
      const trimmed = data.baseUrl.replace(/\/+$/, '');
      const url = trimmed.endsWith('/v1') ? `${trimmed}/models` : `${trimmed}/v1/models`;
      const res = await fetch(url, {
        headers: {
          ...(data.apiKey ? { Authorization: `Bearer ${data.apiKey}` } : {}),
        },
      });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json.data) ? json.data : Array.isArray(json.models) ? json.models : Array.isArray(json) ? json : [];
        const models = rawList
          .map((m: any) => ({
            id: m.id || m.name || (typeof m === 'string' ? m : ''),
            name: m.name || m.id || (typeof m === 'string' ? m : ''),
          }))
          .filter((m: any) => Boolean(m.id));
        if (models.length > 0) {
          return { success: true, models };
        }
        return { success: false, models: [], message: '未解析到可用模型数据' };
      }
      const errText = await res.text();
      let cleanMsg = `HTTP ${res.status}: ${res.statusText}`;
      try {
        const errJson = JSON.parse(errText);
        cleanMsg = errJson.error?.message || errJson.message || errJson.detail?.error?.message || cleanMsg;
      } catch {}
      return { success: false, models: [], message: cleanMsg };
    } catch (err: any) {
      return { success: false, models: [], message: err.message };
    }
  },

  hideToolbar: () => {
    if (isTauri) {
      invoke('hide_toolbar').catch(console.error);
    }
  },

  showAction: (data) => {
    if (isTauri) {
      invoke('show_action', { actionId: data.actionId, customPrompt: data.customPrompt }).catch(console.error);
    } else {
      window.dispatchEvent(new CustomEvent('action_start', { detail: data }));
    }
  },

  hideAction: () => {
    if (isTauri) {
      invoke('hide_action').catch(console.error);
    }
  },

  pinAction: (pinned) => {
    if (isTauri) {
      invoke('pin_action', { pinned }).catch(console.error);
    }
  },

  openSettings: () => {
    if (isTauri) {
      invoke('open_settings').catch(console.error);
    } else {
      window.open('?window=settings', '_blank', 'width=980,height=680');
    }
  },

  copyText: (text) => {
    if (isTauri) {
      invoke('copy_to_clipboard', { text }).catch(() => {
        navigator.clipboard?.writeText(text);
      });
    } else {
      navigator.clipboard?.writeText(text);
    }
  },

  openExternal: (url) => {
    window.open(url, '_blank');
  },

  testTrigger: (text) => {
    window.dispatchEvent(
      new CustomEvent('selection_updated', {
        detail: { text, x: window.innerWidth / 2, y: window.innerHeight / 2 },
      })
    );
  },

  startChatStream: (data) => {
    if (isTauri && data.baseUrl) {
      invoke('start_chat_stream', {
        baseUrl: data.baseUrl,
        apiKey: data.apiKey || '',
        model: data.model || 'gpt-3.5-turbo',
        prompt: data.prompt,
      }).catch((e) => {
        window.dispatchEvent(new CustomEvent('llm_error', { detail: e.toString() }));
      });
      return;
    }

    // Direct browser fetch streaming fallback
    (async () => {
      try {
        const trimmed = (data.baseUrl || 'https://api.deepseek.com').replace(/\/+$/, '');
        const url = trimmed.endsWith('/v1') ? `${trimmed}/chat/completions` : `${trimmed}/v1/chat/completions`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(data.apiKey ? { Authorization: `Bearer ${data.apiKey}` } : {}),
          },
          body: JSON.stringify({
            model: data.model || 'deepseek-chat',
            messages: [{ role: 'user', content: data.prompt }],
            stream: true,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          window.dispatchEvent(new CustomEvent('llm_error', { detail: `HTTP ${res.status}: ${errText}` }));
          return;
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        if (!reader) return;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
              const dataStr = trimmedLine.slice(6).trim();
              if (dataStr === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                const chunk = parsed.choices?.[0]?.delta?.content;
                if (chunk) {
                  window.dispatchEvent(new CustomEvent('llm_chunk', { detail: chunk }));
                }
              } catch (_) {}
            }
          }
        }
        window.dispatchEvent(new CustomEvent('llm_done'));
      } catch (err: any) {
        window.dispatchEvent(new CustomEvent('llm_error', { detail: err.message }));
      }
    })();
  },

  stopChatStream: () => {
    if (isTauri) {
      invoke('stop_chat_stream').catch(console.error);
    }
  },

  onSelectionUpdated: (callback) => {
    if (isTauri) {
      let unlistenFn: (() => void) | null = null;
      listen<SelectionPayload>('selection_updated', (event) => {
        callback(event.payload);
      }).then((un) => {
        unlistenFn = un;
      });
      return () => {
        unlistenFn?.();
      };
    }

    const handler = (e: any) => callback(e.detail);
    window.addEventListener('selection_updated', handler);
    return () => window.removeEventListener('selection_updated', handler);
  },

  onActionStart: (callback) => {
    if (isTauri) {
      let unlistenFn: (() => void) | null = null;
      listen<any>('action_start', (event) => {
        callback(event.payload);
      }).then((un) => {
        unlistenFn = un;
      });
      return () => {
        unlistenFn?.();
      };
    }

    const handler = (e: any) => callback(e.detail);
    window.addEventListener('action_start', handler);
    return () => window.removeEventListener('action_start', handler);
  },

  onLlmChunk: (callback) => {
    if (isTauri) {
      let unlistenFn: (() => void) | null = null;
      listen<string>('llm_chunk', (event) => {
        callback(event.payload);
      }).then((un) => {
        unlistenFn = un;
      });
      return () => {
        unlistenFn?.();
      };
    }

    const handler = (e: any) => callback(e.detail);
    window.addEventListener('llm_chunk', handler);
    return () => window.removeEventListener('llm_chunk', handler);
  },

  onLlmDone: (callback) => {
    if (isTauri) {
      let unlistenFn: (() => void) | null = null;
      listen('llm_done', () => {
        callback();
      }).then((un) => {
        unlistenFn = un;
      });
      return () => {
        unlistenFn?.();
      };
    }

    const handler = () => callback();
    window.addEventListener('llm_done', handler);
    return () => window.removeEventListener('llm_done', handler);
  },

  onLlmError: (callback) => {
    if (isTauri) {
      let unlistenFn: (() => void) | null = null;
      listen<string>('llm_error', (event) => {
        callback(event.payload);
      }).then((un) => {
        unlistenFn = un;
      });
      return () => {
        unlistenFn?.();
      };
    }

    const handler = (e: any) => callback(e.detail);
    window.addEventListener('llm_error', handler);
    return () => window.removeEventListener('llm_error', handler);
  },
};

// Expose globally on window.electronAPI for universal compatibility
if (typeof window !== 'undefined') {
  window.electronAPI = bridge;
}
