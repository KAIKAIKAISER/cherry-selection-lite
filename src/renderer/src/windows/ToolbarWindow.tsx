import React, { useEffect, useState } from 'react';
import { Settings, X, Check } from 'lucide-react';
import { AppConfig, SelectionPayload, ActionItem } from '../types';
import { ActionIcon } from '../components/ActionIcon';
import logo from '../assets/logo.png';

export const ToolbarWindow: React.FC = () => {
  const [selection, setSelection] = useState<SelectionPayload | null>(null);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.electronAPI.getConfig().then((cfg) => {
      setConfig(cfg);
    });

    const cleanupSelection = window.electronAPI.onSelectionUpdated((payload) => {
      setSelection(payload);
      setCopied(false);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.electronAPI.hideToolbar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cleanupSelection();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleActionClick = (action: ActionItem) => {
    if (!selection) return;

    if (action.id === 'copy') {
      window.electronAPI.copyText(selection.text);
      setCopied(true);
      setTimeout(() => {
        window.electronAPI.hideToolbar();
      }, 400);
      return;
    }

    if (action.id === 'search') {
      const query = encodeURIComponent(selection.text);
      const url = action.searchEngine
        ? action.searchEngine.split('|')[1].replace('{{queryString}}', query)
        : `https://www.google.com/search?q=${query}`;
      window.electronAPI.openExternal(url);
      window.electronAPI.hideToolbar();
      return;
    }

    // Trigger result window for AI actions
    window.electronAPI.showAction({ actionId: action.id });
  };

  const enabledActions = config?.actions?.filter((a) => a.enabled) || [];
  const isCompact = config?.selection?.compact ?? false;

  return (
    <div className="w-screen h-screen flex items-center justify-start p-1 pl-2.5 bg-transparent select-none overflow-hidden">
      <div className="box-border inline-flex h-9 items-center rounded-full bg-white/95 dark:bg-zinc-850/95 border border-zinc-200/90 dark:border-zinc-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.12)] px-2.5 gap-1.5 backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
        {/* Left Cherry drag handle */}
        <div
          className="drag-region flex items-center justify-center cursor-move pr-1 select-none shrink-0"
          title="按住拖拽工具栏"
        >
          <img
            src={logo}
            alt="Cherry"
            className="w-[18px] h-[18px] rounded-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-700 shrink-0" />

        {/* Action Buttons */}
        <div className="flex items-center gap-1 no-drag whitespace-nowrap">
          {enabledActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-normal text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-500 dark:hover:text-red-400 transition-colors whitespace-nowrap select-none cursor-pointer shrink-0"
              title={action.name}
            >
              {action.id === 'copy' && copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <ActionIcon id={action.id} className="w-3.5 h-3.5 shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
              )}
              {!isCompact && (
                <span className="whitespace-nowrap text-xs leading-none select-none">
                  {action.id === 'copy' && copied ? '已复制' : action.name}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-700 shrink-0" />

        {/* Settings & Close */}
        <div className="flex items-center gap-0.5 no-drag shrink-0">
          <button
            onClick={() => window.electronAPI.openSettings()}
            className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="设置"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => window.electronAPI.hideToolbar()}
            className="p-1 rounded-full text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="关闭"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
