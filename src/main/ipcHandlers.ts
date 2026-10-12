import { ipcMain, clipboard, shell } from 'electron';
import { windowManager } from './windowManager';
import { configStore } from './configStore';
import { selectionService } from './selectionService';

let activeAbortController: AbortController | null = null;

export function registerIpcHandlers() {
  // Config
  ipcMain.handle('config:get', () => {
    return configStore.get();
  });

  ipcMain.handle('config:set', (_event, newConfig) => {
    const updated = configStore.set(newConfig);
    selectionService.registerShortcuts();
    return updated;
  });

  // Provider Connection Test
  ipcMain.handle('provider:test', async (_event, { baseUrl, apiKey, modelId }) => {
    if (!baseUrl) {
      return { success: false, message: 'API 地址不能为空' };
    }
    const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const targetUrl = `${cleanUrl}/chat/completions`;

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey ? `Bearer ${apiKey}` : '',
        },
        body: JSON.stringify({
          model: modelId || 'deepseek-chat',
          messages: [{ role: 'user', content: 'Hi' }],
          max_tokens: 5,
        }),
      });

      if (res.ok) {
        return { success: true, message: '连接成功！API 正常响应。' };
      }
      const errText = await res.text();
      return { success: false, message: `请求失败 [${res.status}]: ${errText.slice(0, 150)}` };
    } catch (e: any) {
      return { success: false, message: `网络连接异常: ${e.message}` };
    }
  });

  // Provider Sync Models
  ipcMain.handle('provider:sync-models', async (_event, { baseUrl, apiKey }) => {
    if (!baseUrl) return { success: false, models: [] };
    const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const targetUrl = `${cleanUrl}/models`;

    try {
      const res = await fetch(targetUrl, {
        headers: {
          Authorization: apiKey ? `Bearer ${apiKey}` : '',
        },
      });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
        const models = rawList.map((m: any) => ({
          id: m.id || m.name,
          name: m.id || m.name,
          enabled: true,
        }));
        return { success: true, models };
      }
      return { success: false, models: [] };
    } catch (e) {
      return { success: false, models: [] };
    }
  });

  // Window Controls
  ipcMain.on('window:hide-toolbar', () => {
    windowManager.hideToolbar();
  });

  ipcMain.on('window:show-action', (_event, { actionId, customPrompt }) => {
    windowManager.showAction(actionId, customPrompt);
  });

  ipcMain.on('window:hide-action', () => {
    windowManager.hideActionWindow();
  });

  ipcMain.on('window:pin-action', (_event, pinned: boolean) => {
    windowManager.setPinned(pinned);
  });

  ipcMain.on('window:open-settings', () => {
    windowManager.createSettingsWindow();
  });

  // System
  ipcMain.on('system:copy-text', (_event, text: string) => {
    clipboard.writeText(text);
  });

  ipcMain.on('system:open-external', (_event, url: string) => {
    shell.openExternal(url);
  });

  ipcMain.on('selection:test-trigger', (_event, text: string) => {
    selectionService.triggerManual(text);
  });

  // LLM Stream Handling
  ipcMain.on('llm:stop-stream', () => {
    if (activeAbortController) {
      activeAbortController.abort();
      activeAbortController = null;
    }
  });

  ipcMain.on('llm:chat-stream', async (event, { prompt, actionId, modelOverride }) => {
    if (activeAbortController) {
      activeAbortController.abort();
    }
    activeAbortController = new AbortController();

    const config = configStore.get();

    // Determine target provider and model based on action
    let targetProvider = config.providers.find((p) => p.enabled && p.apiKey) || config.providers[0];
    let targetModelId = 'hunyuan-mt2-pro';

    if (modelOverride) {
      targetModelId = modelOverride;
    } else if (actionId === 'translate' && config.defaultTranslateModel) {
      const p = config.providers.find((item) => item.id === config.defaultTranslateModel.providerId);
      if (p) targetProvider = p;
      targetModelId = config.defaultTranslateModel.modelId;
    } else if (config.defaultAssistantModel) {
      const p = config.providers.find((item) => item.id === config.defaultAssistantModel.providerId);
      if (p) targetProvider = p;
      targetModelId = config.defaultAssistantModel.modelId;
    }

    const { baseUrl, apiKey } = targetProvider;
    const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const targetUrl = `${cleanUrl}/chat/completions`;

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey ? `Bearer ${apiKey}` : '',
        },
        body: JSON.stringify({
          model: targetModelId,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          stream: true,
          temperature: 0.7,
          max_tokens: 2048,
        }),
        signal: activeAbortController.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        event.sender.send('llm:error', `API 请求失败 [${response.status}]: ${errorText.slice(0, 200)}`);
        return;
      }

      if (!response.body) {
        event.sender.send('llm:error', 'API 响应体为空');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue;

          if (trimmed === 'data: [DONE]') {
            event.sender.send('llm:done');
            return;
          }

          if (trimmed.startsWith('data: ')) {
            try {
              const json = JSON.parse(trimmed.slice(6));
              const delta = json.choices?.[0]?.delta?.content || '';
              if (delta) {
                event.sender.send('llm:chunk', delta);
              }
            } catch (err) {
              // Ignore partial JSON
            }
          }
        }
      }

      event.sender.send('llm:done');
    } catch (err: any) {
      if (err.name === 'AbortError') {
        event.sender.send('llm:done');
      } else {
        event.sender.send('llm:error', `流式连接异常: ${err.message || String(err)}`);
      }
    } finally {
      activeAbortController = null;
    }
  });
}
