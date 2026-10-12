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
