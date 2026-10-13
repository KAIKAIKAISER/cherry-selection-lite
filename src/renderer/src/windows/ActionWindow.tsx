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
  Droplet,
} from 'lucide-react';
import { AppConfig, SelectionPayload } from '../types';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { ActionIcon } from '../components/ActionIcon';
import logo from '../assets/logo.png';

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
  const [selectedProviderId, setSelectedProviderId] = useState<string>('deepseek');
  const [selectedModelId, setSelectedModelId] = useState<string>('deepseek-chat');
  const [selectedModelName, setSelectedModelName] = useState<string>('DeepSeek-V3');
  const [showModelMenu, setShowModelMenu] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(100);
  const [showOpacitySlider, setShowOpacitySlider] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const configRef = useRef<AppConfig | null>(null);

  useEffect(() => {
    const handleUpdateConfig = (cfg: AppConfig) => {
      configRef.current = cfg;
      setConfig(cfg);
      setIsPinned(cfg.actionWindow.autoPin);
      setOpacity(cfg.actionWindow.opacity || 100);

      const defTarget = cfg.defaultAssistantModel;
      const validProviders = (cfg.providers || []).filter(
        (p) => p.enabled && (Boolean(p.apiKey && p.apiKey.trim().length > 0) || p.id === 'ollama')
      );
      let foundProvider = validProviders.find((p) => p.id === defTarget?.providerId);
      let foundModel = foundProvider?.models.find((m) => m.id === defTarget?.modelId && m.enabled !== false);

      if (!foundProvider || !foundModel) {
        foundProvider = validProviders[0];
        foundModel = foundProvider?.models.find((m) => m.enabled !== false) || foundProvider?.models[0];
      }

      if (foundProvider && foundModel) {
        setSelectedProviderId(foundProvider.id);
        setSelectedModelId(foundModel.id);
        setSelectedModelName(foundModel.name || foundModel.id);
      }
    };

    window.electronAPI.getConfig().then(handleUpdateConfig);
    const cleanupConfig = window.electronAPI.onConfigChanged?.(handleUpdateConfig);

    const cleanupAction = window.electronAPI.onActionStart(({ actionId, customPrompt, selection: sel }) => {
      setCurrentActionId(actionId);
      setSelection(sel);
      setResultText('');
      setErrorMessage(null);
      setFollowUpText('');

      window.electronAPI.getConfig().then((cfg) => {
        configRef.current = cfg;
        setConfig(cfg);
        const isTranslate = actionId === 'translate';
        const def = (isTranslate && cfg.defaultTranslateModel?.providerId)
          ? cfg.defaultTranslateModel
          : cfg.defaultAssistantModel;

        const validProviders = (cfg.providers || []).filter(
          (p) => p.enabled && (Boolean(p.apiKey && p.apiKey.trim().length > 0) || p.id === 'ollama')
        );

        let prov = validProviders.find((p) => p.id === def?.providerId);
        let mod = prov?.models.find((m) => m.id === def?.modelId && m.enabled !== false);

        if (!prov || !mod) {
          prov = validProviders[0];
          mod = prov?.models.find((m) => m.enabled !== false) || prov?.models[0];
        }

        const pId = prov?.id;
        const mId = mod?.id;
        const mName = mod?.name || mId;

        if (pId && mId) {
          setSelectedProviderId(pId);
          setSelectedModelId(mId);
          setSelectedModelName(mName);
          startGeneration(actionId, sel, customPrompt, pId, mId, cfg);
        } else {
          setErrorMessage('未找到已启用并配置 API Key 的模型服务商，请在设置中配置服务商。');
          setIsStreaming(false);
        }
      });
    });

    const cleanupChunk = window.electronAPI.onLlmChunk((chunk) => {
      setResultText((prev) => prev + chunk);
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
      cleanupConfig?.();
      cleanupAction();
      cleanupChunk();
      cleanupDone();
      cleanupError();
    };
  }, []);

  const getActiveProviderAndModel = (
    actionId: string,
    targetProvId?: string,
    targetModId?: string,
    cfgOverride?: AppConfig
  ) => {
    const currentCfg = cfgOverride || configRef.current || config;
    if (!currentCfg) return null;

    const provId = targetProvId || selectedProviderId;
    const modId = targetModId || selectedModelId;

    const validProviders = (currentCfg.providers || []).filter(
      (p) => p.enabled && (Boolean(p.apiKey && p.apiKey.trim().length > 0) || p.id === 'ollama')
    );

    let provider = validProviders.find((p) => p.id === provId);
    if (!provider) {
      provider = validProviders.find((p) => p.models.some((m) => m.id === modId && m.enabled !== false));
    }
    if (!provider) {
      provider = validProviders[0];
    }
    if (!provider) return null;

    const model =
      provider.models.find((m) => m.id === modId && m.enabled !== false) ||
      provider.models.find((m) => m.enabled !== false) ||
      provider.models[0];
    if (!model) return null;

    return {
      provider,
      model: model.id,
      modelName: model.name || model.id,
    };
  };

  const startGeneration = (
    actionId: string,
    sel: SelectionPayload | null,
    customPromptOverride?: string,
    targetProvId?: string,
    targetModId?: string,
    cfgOverride?: AppConfig
  ) => {
    if (!sel || !sel.text) return;

    setIsStreaming(true);
    setErrorMessage(null);
    setResultText('');

    const currentCfg = cfgOverride || configRef.current || config;

    let prompt = '';
    if (customPromptOverride) {
      prompt = customPromptOverride.replace('{{text}}', sel.text);
    } else {
      const action = currentCfg?.actions?.find((a) => a.id === actionId);
      if (action && action.prompt) {
        prompt = action.prompt.replace('{{text}}', sel.text);
      } else {
        prompt = `请对以下内容进行处理：\n\n${sel.text}`;
      }
    }

    const active = getActiveProviderAndModel(actionId, targetProvId, targetModId, currentCfg || undefined);
    if (active) {
      setSelectedProviderId(active.provider.id);
      setSelectedModelName(active.modelName);
      setSelectedModelId(active.model);

      window.electronAPI.startChatStream({
        prompt,
        actionId,
        baseUrl: active.provider.baseUrl,
        apiKey: active.provider.apiKey,
        model: active.model,
      });
    } else {
      setErrorMessage('未找到已启用并配置 API Key 的模型服务商，请在设置中配置服务商。');
      setIsStreaming(false);
    }
  };

  const handleSelectModel = (providerId: string, modelId: string, modelName: string) => {
    setSelectedProviderId(providerId);
    setSelectedModelId(modelId);
    setSelectedModelName(modelName);
    setShowModelMenu(false);

    // Save selection to config
    if (config) {
      const isTranslate = currentActionId === 'translate';
      const updatedConfig: AppConfig = {
        ...config,
        ...(isTranslate
          ? { defaultTranslateModel: { providerId, modelId, modelName } }
          : { defaultAssistantModel: { providerId, modelId, modelName } }),
      };
      setConfig(updatedConfig);
      window.electronAPI.saveConfig(updatedConfig);
    }

    // Re-generate output with the newly selected model
    if (selection && selection.text) {
      startGeneration(currentActionId, selection, undefined, providerId, modelId);
    }
  };

  const handleFollowUp = () => {
    if (!followUpText.trim() || !selection) return;

    const followPrompt = `原始选中文本：\n"""\n${selection.text}\n"""\n\n用户追问：\n${followUpText}`;
    setResultText('');
    setIsStreaming(true);
    setErrorMessage(null);

    const active = getActiveProviderAndModel(currentActionId);
    if (active) {
      window.electronAPI.startChatStream({
        prompt: followPrompt,
        actionId: currentActionId,
        baseUrl: active.provider.baseUrl,
        apiKey: active.provider.apiKey,
        model: active.model,
      });
    }
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
  const actionTitle = currentAction ? currentAction.name : 'AI 助手';

  // Filter to ONLY models from enabled providers that have an API key (or ollama) and are enabled
  const availableModels = (config?.providers || [])
    .filter(
      (p) =>
        p.enabled &&
        (Boolean(p.apiKey && p.apiKey.trim().length > 0) || p.id === 'ollama')
    )
    .flatMap((p) =>
      p.models
        .filter((m) => m.enabled !== false)
        .map((m) => ({
          providerId: p.id,
          providerName: p.name,
          modelId: m.id,
          modelName: m.name || m.id,
        }))
    );

  return (
    <div
      className="w-screen h-screen p-2 flex flex-col box-border bg-transparent"
      style={{ opacity: opacity / 100 }}
    >
      <div className="glass-panel shadow-window rounded-2xl flex-1 flex flex-col overflow-hidden border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
        {/* Header Bar */}
        <div className="drag-region flex items-center justify-between px-3.5 py-2.5 bg-zinc-50/80 dark:bg-zinc-900/80 border-b border-zinc-200/60 dark:border-zinc-800/60 select-none relative">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Cherry" className="w-4 h-4 rounded-full object-contain shrink-0" draggable={false} />
            <div className="flex items-center gap-1.5 font-semibold text-xs text-zinc-800 dark:text-zinc-100">
              <ActionIcon id={currentActionId} className="w-3.5 h-3.5 text-rose-500" />
              <span>{actionTitle}</span>
            </div>
          </div>

          <div className="no-drag flex items-center gap-1.5">
            {/* Model Tag with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowModelMenu(!showModelMenu)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-200/60 dark:border-zinc-700/60"
                title="点击切换 AI 模型"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span className="truncate max-w-[130px]">{selectedModelName}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
              </button>

              {showModelMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-64 max-h-72 overflow-y-auto bg-white dark:bg-zinc-850 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 z-50 p-1.5 divide-y divide-zinc-100 dark:divide-zinc-800">
                  {availableModels.length === 0 ? (
                    <div className="p-3 text-center text-xs text-zinc-400">
                      暂无可用模型，请先在设置中启用服务商并配置 API Key
                    </div>
                  ) : (
                    availableModels.map((item) => {
                      const isCurrent =
                        item.providerId === selectedProviderId && item.modelId === selectedModelId;
                      return (
                        <button
                          key={`${item.providerId}-${item.modelId}`}
                          onClick={() => handleSelectModel(item.providerId, item.modelId, item.modelName)}
                          className={`w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium'
                              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
                          }`}
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <div className="font-medium truncate">{item.modelName}</div>
                            <div className="text-[10px] text-zinc-400 truncate flex items-center gap-1.5 mt-0.5">
                              <span>{item.providerName}</span>
                            </div>
                          </div>
                          {isCurrent && <Check className="w-3.5 h-3.5 shrink-0 text-rose-500" />}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Opacity Adjustment */}
            <div className="relative">
              <button
                onClick={() => setShowOpacitySlider(!showOpacitySlider)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="调整窗口透明度"
              >
                <Droplet className="w-3.5 h-3.5" />
              </button>

              {showOpacitySlider && (
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-zinc-850 p-2.5 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 z-50 flex items-center gap-2 w-36">
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500">{opacity}%</span>
                </div>
              )}
            </div>

            {/* Pin Button */}
            <button
              onClick={handleTogglePin}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isPinned
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title={isPinned ? '取消置顶' : '固定窗口 (失去焦点时不关闭)'}
            >
              {isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyResult}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="复制全部结果"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                handleStopGeneration();
                window.electronAPI.hideAction();
              }}
              className="p-1 rounded-md text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">选中文本</span>
              <button
                onClick={() => setExpandQuote(!expandQuote)}
                className="flex items-center gap-0.5 text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
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
                  className="mt-2 px-2 py-1 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 rounded font-medium text-[11px] transition-colors cursor-pointer"
                >
                  重试
                </button>
              </div>
            </div>
          )}

          {!resultText && isStreaming && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 py-4 justify-center">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>正在生成中...</span>
            </div>
          )}

          {resultText && <MarkdownRenderer content={resultText} isStreaming={isStreaming} />}
        </div>

        {/* Bottom Bar: Follow-up & Regenerate */}
        <div className="p-2.5 bg-zinc-50/70 dark:bg-zinc-900/70 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-1.5">
          <input
            type="text"
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFollowUp();
            }}
            placeholder="针对此内容追问..."
            className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-rose-500 transition-colors"
          />

          {isStreaming ? (
            <button
              onClick={handleStopGeneration}
              className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
              title="停止生成"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <>
              <button
                onClick={handleFollowUp}
                disabled={!followUpText.trim()}
                className="p-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white transition-colors cursor-pointer"
                title="发送追问"
              >
                <Send className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => startGeneration(currentActionId, selection)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
