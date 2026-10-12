import { globalShortcut, screen, clipboard } from 'electron';
import { SelectionPayload } from './types';
import { configStore } from './configStore';

type SelectionCallback = (payload: SelectionPayload) => void;

export class SelectionService {
  private onSelectionCallback: SelectionCallback | null = null;
  private isNativeHookActive = false;
  private nativeHookInstance: any = null;
  private lastSelectedText = '';
  private lastTriggerTime = 0;

  constructor() {
    this.initNativeHook();
  }

  public setOnSelection(callback: SelectionCallback) {
    this.onSelectionCallback = callback;
  }

  private initNativeHook() {
    try {
      // Attempt to load selection-hook if native addon is compiled and available
      const SelectionHook = require('selection-hook');
      this.nativeHookInstance = new SelectionHook();

      this.nativeHookInstance.on('text-selection', (data: any) => {
        const config = configStore.get();
        if (!config.selection.enabled) return;

        const text = (data.text || '').trim();
        if (text.length < config.selection.minSelectionLength) return;

        // Blacklist check
        if (data.programName && config.selection.blacklist.some(b => data.programName.toLowerCase().includes(b.toLowerCase()))) {
          return;
        }

        const point = screen.getCursorScreenPoint();
        this.emitSelection({
          text,
          x: data.x || point.x,
          y: data.y || point.y,
          programName: data.programName,
          source: 'native-hook'
        });
      });

      this.nativeHookInstance.start({
        enableClipboard: true,
      });
      this.isNativeHookActive = true;
      console.log('[SelectionService] Native selection-hook loaded successfully.');
    } catch (err) {
      console.log('[SelectionService] selection-hook native addon not found, fallback hotkey & clipboard mode enabled.');
      this.isNativeHookActive = false;
    }
  }

  public registerShortcuts() {
    const config = configStore.get();
    globalShortcut.unregisterAll();

    if (!config.selection.enabled) return;

    const shortcut = config.selection.shortcut || 'Alt+S';
    try {
      const registered = globalShortcut.register(shortcut, () => {
        this.triggerFromHotkey();
      });
      if (registered) {
        console.log(`[SelectionService] Global shortcut registered: ${shortcut}`);
      } else {
        console.warn(`[SelectionService] Failed to register shortcut: ${shortcut}`);
      }
    } catch (e) {
      console.error('[SelectionService] Error registering shortcut:', e);
    }
  }

  public triggerFromHotkey() {
    const text = clipboard.readText().trim();
    const point = screen.getCursorScreenPoint();

    if (text) {
      this.emitSelection({
        text,
        x: point.x,
        y: point.y,
        source: 'hotkey'
      });
    }
  }

  public triggerManual(text: string, x?: number, y?: number) {
    const point = screen.getCursorScreenPoint();
    this.emitSelection({
      text: text.trim(),
      x: x !== undefined ? x : point.x,
      y: y !== undefined ? y : point.y,
      source: 'manual'
    });
  }

  private emitSelection(payload: SelectionPayload) {
    const now = Date.now();
    // Debounce triggers within 300ms if identical text
    if (payload.text === this.lastSelectedText && now - this.lastTriggerTime < 300) {
      return;
    }
    this.lastSelectedText = payload.text;
    this.lastTriggerTime = now;

    if (this.onSelectionCallback) {
      this.onSelectionCallback(payload);
    }
  }

  public destroy() {
    globalShortcut.unregisterAll();
    if (this.nativeHookInstance) {
      try {
        this.nativeHookInstance.cleanup();
      } catch (e) {
        // ignore
      }
    }
  }
}

export const selectionService = new SelectionService();
