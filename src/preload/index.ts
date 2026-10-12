import { contextBridge, ipcRenderer } from 'electron';

export interface IElectronAPI {
  getConfig: () => Promise<any>;
  setConfig: (config: any) => Promise<any>;
  hideToolbar: () => void;
  showAction: (data: { actionId: string; customPrompt?: string }) => void;
  hideAction: () => void;
  pinAction: (pinned: boolean) => void;
  openSettings: () => void;
  copyText: (text: string) => void;
  openExternal: (url: string) => void;
  testTrigger: (text: string) => void;
  startChatStream: (data: { prompt: string; modelOverride?: string }) => void;
  stopChatStream: () => void;
  onSelectionUpdated: (callback: (payload: any) => void) => () => void;
  onActionStart: (callback: (data: any) => void) => () => void;
  onLlmChunk: (callback: (chunk: string) => void) => () => void;
  onLlmDone: (callback: () => void) => () => void;
  onLlmError: (callback: (error: string) => void) => () => void;
}

const api: IElectronAPI = {
  getConfig: () => ipcRenderer.invoke('config:get'),
  setConfig: (config) => ipcRenderer.invoke('config:set', config),
  hideToolbar: () => ipcRenderer.send('window:hide-toolbar'),
  showAction: (data) => ipcRenderer.send('window:show-action', data),
  hideAction: () => ipcRenderer.send('window:hide-action'),
  pinAction: (pinned) => ipcRenderer.send('window:pin-action', pinned),
  openSettings: () => ipcRenderer.send('window:open-settings'),
  copyText: (text) => ipcRenderer.send('system:copy-text', text),
  openExternal: (url) => ipcRenderer.send('system:open-external', url),
  testTrigger: (text) => ipcRenderer.send('selection:test-trigger', text),
  startChatStream: (data) => ipcRenderer.send('llm:chat-stream', data),
  stopChatStream: () => ipcRenderer.send('llm:stop-stream'),

  onSelectionUpdated: (callback) => {
    const handler = (_: any, data: any) => callback(data);
    ipcRenderer.on('selection:updated', handler);
    return () => ipcRenderer.removeListener('selection:updated', handler);
  },
  onActionStart: (callback) => {
    const handler = (_: any, data: any) => callback(data);
    ipcRenderer.on('action:start', handler);
    return () => ipcRenderer.removeListener('action:start', handler);
  },
  onLlmChunk: (callback) => {
    const handler = (_: any, chunk: string) => callback(chunk);
    ipcRenderer.on('llm:chunk', handler);
    return () => ipcRenderer.removeListener('llm:chunk', handler);
  },
  onLlmDone: (callback) => {
    const handler = () => callback();
    ipcRenderer.on('llm:done', handler);
    return () => ipcRenderer.removeListener('llm:done', handler);
  },
  onLlmError: (callback) => {
    const handler = (_: any, error: string) => callback(error);
    ipcRenderer.on('llm:error', handler);
    return () => ipcRenderer.removeListener('llm:error', handler);
  },
};

contextBridge.exposeInMainWorld('electronAPI', api);
