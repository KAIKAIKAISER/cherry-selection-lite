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

  ipcMain.on('llm:chat-stream', async (event, { prompt, modelOverride }) => {
    if (activeAbortController) {
      activeAbortController.abort();
    }
    activeAbortController = new AbortController();

    const config = configStore.get();
    const { baseUrl, apiKey, model, temperature, maxTokens } = config.provider;

    const targetModel = modelOverride || model || 'deepseek-chat';
    const targetUrl = baseUrl.endsWith('/')
      ? `${baseUrl}chat/completions`
      : `${baseUrl}/chat/completions`;

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          stream: true,
          temperature: temperature ?? 0.7,
          max_tokens: maxTokens ?? 2048,
        }),
        signal: activeAbortController.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        event.sender.send('llm:error', `API 请求失败 [${response.status}]: ${errorText}`);
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
              // Ignore partial JSON or invalid chunk
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
