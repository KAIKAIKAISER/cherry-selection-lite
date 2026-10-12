import React, { useEffect, useState } from 'react';
import { ToolbarWindow } from './windows/ToolbarWindow';
import { ActionWindow } from './windows/ActionWindow';
import { SettingsWindow } from './windows/SettingsWindow';

export const App: React.FC = () => {
  const [windowType, setWindowType] = useState<string>('toolbar');

  useEffect(() => {
    // Parse ?window=toolbar|action|settings
    const params = new URLSearchParams(window.location.search);
    const type = params.get('window') || 'toolbar';
    setWindowType(type);

    // Apply Theme
    if (window.electronAPI) {
      window.electronAPI.getConfig().then((cfg) => {
        applyTheme(cfg.theme);
      });
    } else {
      applyTheme('system');
    }
  }, []);

  const applyTheme = (theme: 'system' | 'light' | 'dark') => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  switch (windowType) {
    case 'action':
      return <ActionWindow />;
    case 'settings':
      return <SettingsWindow />;
    case 'toolbar':
    default:
      return <ToolbarWindow />;
  }
};
