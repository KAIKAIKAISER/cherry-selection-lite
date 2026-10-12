import React, { useEffect, useState } from 'react';
import {
  Languages,
  HelpCircle,
  FileText,
  Sparkles,
  Search,
  Copy,
  Code2,
  Settings,
  X,
  Check,
} from 'lucide-react';
import { ActionPrompt, AppConfig, SelectionPayload } from '../types';

export const ToolbarWindow: React.FC = () => {
  const [selection, setSelection] = useState<SelectionPayload | null>(null);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load config
    window.electronAPI.getConfig().then((cfg) => {
      setConfig(cfg);
    });

    // Listen for selection updates
    const cleanupSelection = window.electronAPI.onSelectionUpdated((payload) => {
      setSelection(payload);
      setCopied(false);
    });

    // Listen to escape key to hide toolbar
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

  const handleActionClick = (actionId: string) => {
    if (!selection) return;

    if (actionId === 'copy') {
      window.electronAPI.copyText(selection.text);
      setCopied(true);
      setTimeout(() => {
        window.electronAPI.hideToolbar();
      }, 500);
      return;
    }

    if (actionId === 'search') {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(selection.text)}`;
      window.electronAPI.openExternal(searchUrl);
      window.electronAPI.hideToolbar();
      return;
    }

    // Trigger AI action window
    window.electronAPI.showAction({ actionId });
  };

  const getActionIcon = (id: string) => {
    switch (id) {
      case 'translate':
        return <Languages className="w-3.5 h-3.5" />;
      case 'explain':
        return <HelpCircle className="w-3.5 h-3.5" />;
      case 'summarize':
        return <FileText className="w-3.5 h-3.5" />;
      case 'refine':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'code':
        return <Code2 className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const enabledActions = config?.actions?.filter((a) => a.enabled) || [];
  const isCompact = config?.selection?.compactMode ?? false;

  return (
    <div className="w-screen h-screen flex items-center justify-center p-1">
      <div className="glass-panel shadow-toolbar rounded-2xl flex items-center px-2 py-1.5 gap-1 select-none animate-in fade-in zoom-in-95 duration-150">
        {/* Left Cherry drag handle */}
        <div
          className="drag-region flex items-center justify-center px-1.5 py-1 text-cherry-500 hover:text-cherry-600 cursor-move transition-colors"
          title="按住拖动工具栏"
        >
          <span className="text-base leading-none select-none">🍒</span>
        </div>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

        {/* Action Buttons */}
        <div className="flex items-center gap-0.5 no-drag">
          {enabledActions.map((action: ActionPrompt) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-cherry-500 dark:hover:text-cherry-400 transition-colors"
              title={action.name}
            >
              {getActionIcon(action.id)}
              {!isCompact && <span>{action.name}</span>}
            </button>
          ))}

          {/* Quick Search */}
          <button
            onClick={() => handleActionClick('search')}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-cherry-500 dark:hover:text-cherry-400 transition-colors"
            title="搜索"
          >
            <Search className="w-3.5 h-3.5" />
            {!isCompact && <span>搜索</span>}
          </button>

          {/* Quick Copy */}
          <button
            onClick={() => handleActionClick('copy')}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-emerald-500 transition-colors"
            title="复制"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {!isCompact && <span>{copied ? '已复制' : '复制'}</span>}
          </button>
        </div>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

        {/* Settings & Dismiss */}
        <div className="flex items-center gap-0.5 no-drag">
          <button
            onClick={() => window.electronAPI.openSettings()}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="设置"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => window.electronAPI.hideToolbar()}
            className="p-1 rounded-md text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="关闭"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
