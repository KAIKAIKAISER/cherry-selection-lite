export interface ActionPrompt {
  id: string;
  name: string;
  icon: string;
  prompt: string;
  enabled: boolean;
  modelOverride?: string;
}

export interface AppConfig {
  provider: {
    name: string;
    baseUrl: string;
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  selection: {
    enabled: boolean;
    triggerMode: 'selection' | 'ctrl' | 'shortcut';
    shortcut: string;
    compactMode: boolean;
    blacklist: string[];
    minSelectionLength: number;
  };
  actionWindow: {
    followToolbar: boolean;
    rememberSize: boolean;
    autoClose: boolean;
    autoPin: boolean;
    opacity: number;
    width: number;
    height: number;
  };
  actions: ActionPrompt[];
  theme: 'system' | 'light' | 'dark';
}

export interface SelectionPayload {
  text: string;
  x: number;
  y: number;
  programName?: string;
  source?: string;
}

export interface IElectronAPI {
  getConfig: () => Promise<AppConfig>;
  setConfig: (config: Partial<AppConfig>) => Promise<AppConfig>;
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
  onSelectionUpdated: (callback: (payload: SelectionPayload) => void) => () => void;
  onActionStart: (callback: (data: { actionId: string; customPrompt?: string; selection: SelectionPayload }) => void) => () => void;
  onLlmChunk: (callback: (chunk: string) => void) => () => void;
  onLlmDone: (callback: () => void) => () => void;
  onLlmError: (callback: (error: string) => void) => () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
