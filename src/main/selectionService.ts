import { globalShortcut, screen, clipboard } from 'electron';
import path from 'path';
import { SelectionPayload } from './types';
import { configStore } from './configStore';

type SelectionCallback = (payload: SelectionPayload) => void;

export class SelectionService {
  private onSelectionCallback: SelectionCallback | null = null;
  private nativeHookInstance: any = null;
  private isCtrlPressed = false;
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
      // Load prebuilt selection-hook from vendor directory
      const hookPath = path.resolve(__dirname, '../../vendor/selection-hook');
      const SelectionHook = require(hookPath);
      this.nativeHookInstance = new SelectionHook();

      // Listen to keyboard events to track Ctrl state
      this.nativeHookInstance.on('key-down', (keyData: any) => {
        if (keyData.vkCode === 17 || keyData.vkCode === 162 || keyData.vkCode === 163) {
          this.isCtrlPressed = true;
        }
      });

      this.nativeHookInstance.on('key-up', (keyData: any) => {
        if (keyData.vkCode === 17 || keyData.vkCode === 162 || keyData.vkCode === 163) {
          this.isCtrlPressed = false;
        }
      });

      // Listen to text selection event
      this.nativeHookInstance.on('text-selection', (data: any) => {
        const config = configStore.get();
        if (!config.selection.enabled) return;

        // Check trigger mode
        if (config.selection.triggerMode === 'ctrlkey' && !this.isCtrlPressed) {
          return;
        }
        if (config.selection.triggerMode === 'shortcut') {
          return; // Handled by global shortcut
        }

        const text = (data.text || '').trim();
        if (!text || text.length === 0) return;

        // Blacklist filtering
        if (
          data.programName &&
          config.selection.filterList &&
          config.selection.filterList.some((item) =>
            data.programName.toLowerCase().includes(item.toLowerCase())
          )
        ) {
          return;
        }

        const point = screen.getCursorScreenPoint();
        this.emitSelection({
          text,
          x: data.x !== undefined && data.x !== -99999 ? data.x : point.x,
          y: data.y !== undefined && data.y !== -99999 ? data.y : point.y,
          programName: data.programName,
          source: 'native-hook',
        });
      });

      this.nativeHookInstance.start({
        enableClipboard: true,
      });
      console.log('[SelectionService] Native selection-hook started successfully.');
    } catch (err: any) {
      console.warn('[SelectionService] Native hook load fallback:', err.message);
    }
  }

  public registerShortcuts() {
    const config = configStore.get();
    globalShortcut.unregisterAll();

    if (!config.selection.enabled) return;

    const shortcut = config.selection.shortcut || 'Alt+S';
    try {
      globalShortcut.register(shortcut, () => {
        this.triggerFromHotkey();
      });
      console.log(`[SelectionService] Global shortcut registered: ${shortcut}`);
    } catch (e) {
      console.error('[SelectionService] Failed to register shortcut:', e);
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
        source: 'hotkey',
      });
    }
  }

  public triggerManual(text: string, x?: number, y?: number) {
    const point = screen.getCursorScreenPoint();
    this.emitSelection({
      text: text.trim(),
      x: x !== undefined ? x : point.x,
      y: y !== undefined ? y : point.y,
      source: 'manual',
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
