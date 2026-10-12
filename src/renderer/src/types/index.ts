export interface ProviderModel {
  id: string;
  name: string;
  group?: string;
  enabled?: boolean;
}

export interface ProviderItem {
  id: string;
  name: string;
  icon?: string;
  apiKey: string;
  baseUrl: string;
  enabled: boolean;
  docUrl?: string;
  models: ProviderModel[];
}

export interface ActionItem {
  id: string;
  name: string;
  icon: string;
  prompt: string;
  enabled: boolean;
  isBuiltIn: boolean;
  searchEngine?: string;
  modelOverride?: string;
}

export interface AppConfig {
  providers: ProviderItem[];
  defaultAssistantModel: {
    providerId: string;
    modelId: string;
    modelName: string;
  };
  defaultTranslateModel: {
    providerId: string;
    modelId: string;
    modelName: string;
  };
  selection: {
    enabled: boolean;
    triggerMode: 'selection' | 'ctrlkey' | 'shortcut';
    shortcut: string;
    compact: boolean;
    filterList: string[];
    filterMode: 'default' | 'include' | 'exclude';
  };
  actionWindow: {
    followToolbar: boolean;
    rememberWinSize: boolean;
    autoClose: boolean;
    autoPin: boolean;
    opacity: number;
    width: number;
    height: number;
  };
  actions: ActionItem[];
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
  testProvider: (data: { baseUrl: string; apiKey: string; modelId?: string }) => Promise<{ success: boolean; message: string }>;
  syncModels: (data: { baseUrl: string; apiKey: string }) => Promise<{ success: boolean; models: any[] }>;
  hideToolbar: () => void;
  showAction: (data: { actionId: string; customPrompt?: string }) => void;
  hideAction: () => void;
  pinAction: (pinned: boolean) => void;
  openSettings: () => void;
  copyText: (text: string) => void;
  openExternal: (url: string) => void;
  testTrigger: (text: string) => void;
  startChatStream: (data: { prompt: string; actionId?: string; modelOverride?: string }) => void;
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
