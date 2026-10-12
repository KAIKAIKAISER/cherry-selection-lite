import React, { useEffect, useState, useRef } from 'react';
import {
  Pin,
  PinOff,
  Copy,
  Check,
  RotateCw,
  X,
  Send,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Square,
} from 'lucide-react';
import { ActionPrompt, AppConfig, SelectionPayload } from '../types';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const ActionWindow: React.FC = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [currentActionId, setCurrentActionId] = useState<string>('translate');
  const [selection, setSelection] = useState<SelectionPayload | null>(null);
  const [resultText, setResultText] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [expandQuote, setExpandQuote] = useState<boolean>(false);
  const [followUpText, setFollowUpText] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.electronAPI.getConfig().then((cfg) => {
      setConfig(cfg);
      setIsPinned(cfg.actionWindow.autoPin);
      setSelectedModel(cfg.provider.model || 'deepseek-chat');
    });

    // Listen for action triggers
    const cleanupAction = window.electronAPI.onActionStart(({ actionId, customPrompt, selection: sel }) => {
      setCurrentActionId(actionId);
      setSelection(sel);
      setResultText('');
      setErrorMessage(null);
      setFollowUpText('');

      // Auto start generation
      startGeneration(actionId, sel, customPrompt);
    });

    // Listen to LLM streaming events
    const cleanupChunk = window.electronAPI.onLlmChunk((chunk) => {
      setResultText((prev) => prev + chunk);
      // Auto scroll to bottom
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });

    const cleanupDone = window.electronAPI.onLlmDone(() => {
      setIsStreaming(false);
    });

    const cleanupError = window.electronAPI.onLlmError((err) => {
      setIsStreaming(false);
      setErrorMessage(err);
    });

    return () => {
      cleanupAction();
      cleanupChunk();
      cleanupDone();
      cleanupError();
    };
  }, [config?.actions, selectedModel]);

  const startGeneration = (
    actionId: string,
    sel: SelectionPayload | null,
    customPromptOverride?: string
  ) => {
    if (!sel || !sel.text) return;

    setIsStreaming(true);
    setErrorMessage(null);
    setResultText('');

    let prompt = '';
    if (customPromptOverride) {
      prompt = customPromptOverride.replace('{{text}}', sel.text);
    } else {
      const action = config?.actions?.find((a) => a.id === actionId);
      if (action) {
        prompt = action.prompt.replace('{{text}}', sel.text);
      } else {
        prompt = `请对以下内容进行处理：\n\n${sel.text}`;
      }
    }

    window.electronAPI.startChatStream({
      prompt,
      modelOverride: selectedModel,
    });
  };

  const handleFollowUp = () => {
    if (!followUpText.trim() || !selection) return;

    const followPrompt = `原始选中文本：\n"""\n${selection.text}\n"""\n\n用户追问：\n${followUpText}`;
    setResultText('');
    setIsStreaming(true);
    setErrorMessage(null);

    window.electronAPI.startChatStream({
      prompt: followPrompt,
      modelOverride: selectedModel,
    });
    setFollowUpText('');
  };

  const handleCopyResult = () => {
    if (!resultText) return;
    window.electronAPI.copyText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePin = () => {
    const nextPin = !isPinned;
    setIsPinned(nextPin);
    window.electronAPI.pinAction(nextPin);
  };

  const handleStopGeneration = () => {
    window.electronAPI.stopChatStream();
    setIsStreaming(false);
  };

  const currentAction = config?.actions?.find((a) => a.id === currentActionId);
  const actionTitle = currentAction ? currentAction.name : 'AI 助理';

  return (
    <div className="w-screen h-screen p-2 flex flex-col box-border">
      <div className="glass-panel shadow-window rounded-2xl flex-1 flex flex-col overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80">
        {/* Header Bar */}
        <div className="drag-region flex items-center justify-between px-3.5 py-2.5 bg-zinc-50/80 dark:bg-zinc-900/80 border-b border-zinc-200/60 dark:border-zinc-800/60 select-none">
          <div className="flex items-center gap-2">
            <span className="text-base select-none">🍒</span>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
              {actionTitle}
            </span>
          </div>

          <div className="no-drag flex items-center gap-1.5">
            {/* Model Selector Tag */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-[11px] bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 rounded px-1.5 py-0.5 border-0 focus:ring-1 focus:ring-cherry-500 cursor-pointer outline-none"
            >
              <option value="deepseek-chat">deepseek-chat</option>
              <option value="deepseek-reasoner">deepseek-reasoner</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-4o">gpt-4o</option>
              <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
              <option value="qwen-plus">qwen-plus</option>
            </select>

            {/* Pin Button */}
            <button
              onClick={handleTogglePin}
              className={`p-1 rounded-md transition-colors ${
                isPinned
                  ? 'text-cherry-500 bg-cherry-50 dark:bg-cherry-950/40'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title={isPinned ? '取消置顶' : '置顶窗口 (失去焦点时不关闭)'}
            >
              {isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyResult}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="复制全部结果"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                handleStopGeneration();
                window.electronAPI.hideAction();
              }}
              className="p-1 rounded-md text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="关闭"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Text Preview Quote */}
        {selection && selection.text && (
          <div className="px-3.5 pt-2 pb-1.5 bg-zinc-100/50 dark:bg-zinc-900/40 border-b border-zinc-200/40 dark:border-zinc-800/40 text-zinc-500 dark:text-zinc-400 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                选中文本
              </span>
              <button
                onClick={() => setExpandQuote(!expandQuote)}
                className="flex items-center gap-0.5 text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                {expandQuote ? (
                  <>
                    <span>折叠</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>展开</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
            <p
              className={`mt-1 font-mono text-[11px] select-text leading-relaxed text-zinc-600 dark:text-zinc-300 ${
                expandQuote ? '' : 'line-clamp-2'
              }`}
            >
              {selection.text}
            </p>
          </div>
        )}

        {/* Result Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3.5 select-text">
          {errorMessage && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs mb-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">发生错误</p>
                <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
                <button
                  onClick={() => startGeneration(currentActionId, selection)}
                  className="mt-2 px-2 py-1 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 rounded font-medium text-[11px] transition-colors"
                >
                  重试
                </button>
              </div>
            </div>
          )}

          {!resultText && isStreaming && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 py-4 justify-center">
              <span className="w-2 h-2 rounded-full bg-cherry-500 animate-ping" />
              <span>正在思考并生成中...</span>
            </div>
          )}

          {resultText && (
            <MarkdownRenderer content={resultText} isStreaming={isStreaming} />
          )}
        </div>

        {/* Bottom Follow-up & Actions Bar */}
        <div className="p-2.5 bg-zinc-50/70 dark:bg-zinc-900/70 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-1.5">
          <input
            type="text"
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFollowUp();
            }}
            placeholder="针对此内容追问..."
            className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-cherry-500 transition-colors"
          />

          {isStreaming ? (
            <button
              onClick={handleStopGeneration}
              className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              title="停止生成"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <>
              <button
                onClick={handleFollowUp}
                disabled={!followUpText.trim()}
                className="p-1.5 rounded-lg bg-cherry-500 hover:bg-cherry-600 disabled:opacity-40 text-white transition-colors"
                title="发送追问"
              >
                <Send className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => startGeneration(currentActionId, selection)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
                title="重新生成"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
