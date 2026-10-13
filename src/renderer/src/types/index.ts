export interface ProviderModel {
  id: string;
  name: string;
  group?: string;
  enabled?: boolean;
}

export interface ProviderWebsite {
  official?: string;
  apiKey?: string;
  docs?: string;
  models?: string;
}

export interface ProviderItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  apiKey: string;
  baseUrl: string;
  defaultBaseUrl?: string;
  proxyUrl?: string;
  enabled: boolean;
  isBuiltIn?: boolean;
  website?: ProviderWebsite;
  defaultChatEndpoint?: string;
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

export interface DefaultModelSelection {
  providerId: string;
  modelId: string;
  modelName: string;
}

export interface AppConfig {
  providers: ProviderItem[];
  deletedProviderIds: string[];
  defaultAssistantModel: DefaultModelSelection;
  defaultTranslateModel: DefaultModelSelection;
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

export interface TestResult {
  success: boolean;
  latencyMs?: number;
  message: string;
}

export interface SyncModelsResult {
  success: boolean;
  models: Array<{ id: string; name: string }>;
  message?: string;
}

export interface IElectronAPI {
  getConfig: () => Promise<AppConfig>;
  setConfig: (config: Partial<AppConfig>) => Promise<AppConfig>;
  testProvider: (data: { baseUrl: string; apiKey: string; modelId?: string }) => Promise<TestResult>;
  syncModels: (data: { baseUrl: string; apiKey: string; providerId?: string }) => Promise<SyncModelsResult>;
  hideToolbar: () => void;
  showAction: (data: { actionId: string; customPrompt?: string; selection?: SelectionPayload }) => void;
  hideAction: () => void;
  pinAction: (pinned: boolean) => void;
  openSettings: () => void;
  copyText: (text: string) => void;
  openExternal: (url: string) => void;
  testTrigger: (text: string) => void;
  startChatStream: (data: { prompt: string; actionId?: string; modelOverride?: string; baseUrl?: string; apiKey?: string; model?: string }) => void;
  stopChatStream: () => void;
  onSelectionUpdated: (callback: (payload: SelectionPayload) => void) => () => void;
  onActionStart: (callback: (data: { actionId: string; customPrompt?: string; selection: SelectionPayload }) => void) => () => void;
  onConfigChanged?: (callback: (cfg: AppConfig) => void) => () => void;
  onLlmChunk: (callback: (chunk: string) => void) => () => void;
  onLlmDone: (callback: () => void) => () => void;
  onLlmError: (callback: (error: string) => void) => () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    __TAURI_INTERNALS__?: any;
  }
}
