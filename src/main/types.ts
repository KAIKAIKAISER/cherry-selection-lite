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
