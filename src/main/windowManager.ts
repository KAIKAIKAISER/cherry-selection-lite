import { BrowserWindow, screen, app, Tray, Menu, nativeImage, NativeImage } from 'electron';
import path from 'path';
import fs from 'fs';
import { configStore } from './configStore';
import { SelectionPayload } from './types';

function getResourcePath(...subPaths: string[]): string {
  const possibleRoots = [
    path.join(process.resourcesPath, ...subPaths),
    path.join(__dirname, '../../src/resources', ...subPaths),
    path.join(__dirname, '../../build', ...subPaths),
    path.join(app.getAppPath(), 'build', ...subPaths),
    path.join(app.getAppPath(), 'src/resources', ...subPaths),
  ];
  for (const p of possibleRoots) {
    if (fs.existsSync(p)) return p;
  }
  return '';
}

function getAppIcon(): NativeImage | undefined {
  const target =
    getResourcePath('icons', 'icon.ico') ||
    getResourcePath('icon.ico') ||
    getResourcePath('icons', 'icon.png') ||
    getResourcePath('icon.png');
  if (target) {
    return nativeImage.createFromPath(target);
  }
  return undefined;
}

function getTrayIcon(): NativeImage {
  const trayPath =
    getResourcePath('icons', 'tray_icon.png') ||
    getResourcePath('tray_icon.png') ||
    getResourcePath('icons', 'icon.png') ||
    getResourcePath('icon.png');
  if (trayPath) {
    const img = nativeImage.createFromPath(trayPath);
    return img.resize({ width: 16, height: 16 });
  }
  return nativeImage.createEmpty();
}

export class WindowManager {
  public toolbarWindow: BrowserWindow | null = null;
  public actionWindow: BrowserWindow | null = null;
  public settingsWindow: BrowserWindow | null = null;
  public tray: Tray | null = null;

  private currentSelection: SelectionPayload | null = null;
  private isPinned = false;

  private getPreloadPath(): string {
    return path.join(__dirname, '../preload/index.js');
  }

  private getRendererUrl(windowType: string): string {
    if (process.env.VITE_DEV_SERVER_URL) {
      return `${process.env.VITE_DEV_SERVER_URL}?window=${windowType}`;
    }
    const htmlPath = path.join(__dirname, '../../dist/index.html');
    return `file://${htmlPath}?window=${windowType}`;
  }

  public createToolbarWindow() {
    if (this.toolbarWindow && !this.toolbarWindow.isDestroyed()) return;

    const config = configStore.get();
    const isCompact = config.selection?.compact ?? false;
    const toolbarWidth = isCompact ? 280 : 500;
    const toolbarHeight = 48;

    this.toolbarWindow = new BrowserWindow({
      width: toolbarWidth,
      height: toolbarHeight,
      frame: false,
      transparent: true,
      resizable: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      show: false,
      focusable: false, // Prevents stealing focus from the active text selection app
      icon: getAppIcon(),
      webPreferences: {
        preload: this.getPreloadPath(),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    this.toolbarWindow.loadURL(this.getRendererUrl('toolbar'));

    this.toolbarWindow.on('closed', () => {
      this.toolbarWindow = null;
    });
  }

  public createActionWindow() {
    if (this.actionWindow && !this.actionWindow.isDestroyed()) return;

    const config = configStore.get();
    this.isPinned = config.actionWindow.autoPin;

    this.actionWindow = new BrowserWindow({
      width: config.actionWindow.width || 480,
      height: config.actionWindow.height || 540,
      frame: false,
      transparent: true,
      resizable: true,
      alwaysOnTop: true,
      skipTaskbar: true,
      show: false,
      opacity: (config.actionWindow.opacity || 100) / 100,
      icon: getAppIcon(),
      webPreferences: {
        preload: this.getPreloadPath(),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    this.actionWindow.loadURL(this.getRendererUrl('action'));

    // Handle auto-close on blur if not pinned
    this.actionWindow.on('blur', () => {
      const cfg = configStore.get();
      if (!this.isPinned && cfg.actionWindow.autoClose) {
        this.hideActionWindow();
      }
    });

    this.actionWindow.on('resize', () => {
      if (this.actionWindow) {
        const [width, height] = this.actionWindow.getSize();
        configStore.set({
          actionWindow: {
            ...configStore.get().actionWindow,
            width,
            height,
          },
        });
      }
    });

    this.actionWindow.on('closed', () => {
      this.actionWindow = null;
    });
  }

  public createSettingsWindow() {
    if (this.settingsWindow && !this.settingsWindow.isDestroyed()) {
      this.settingsWindow.show();
      this.settingsWindow.focus();
      return;
    }

    this.settingsWindow = new BrowserWindow({
      width: 860,
      height: 660,
      minWidth: 720,
      minHeight: 520,
      title: 'Cherry Selection Lite - 设置',
      autoHideMenuBar: true,
      transparent: false,
      backgroundColor: '#ffffff',
      icon: getAppIcon(),
      webPreferences: {
        preload: this.getPreloadPath(),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    this.settingsWindow.loadURL(this.getRendererUrl('settings'));

    this.settingsWindow.on('closed', () => {
      this.settingsWindow = null;
    });
  }

  public showToolbar(payload: SelectionPayload) {
    this.currentSelection = payload;
    if (!this.toolbarWindow || this.toolbarWindow.isDestroyed()) {
      this.createToolbarWindow();
    }

    const config = configStore.get();
    const isCompact = config.selection?.compact ?? false;
    const enabledActionsCount = config.actions?.filter((a) => a.enabled).length || 5;

    // Generous spacious layout to guarantee zero line-wrapping
    const toolbarWidth = isCompact
      ? Math.max(240, 48 + enabledActionsCount * 36 + 60)
      : Math.max(380, 48 + enabledActionsCount * 78 + 68);
    const toolbarHeight = 48;

    const display = screen.getDisplayNearestPoint({ x: payload.x, y: payload.y });
    const workArea = display.workArea;

    // Position toolbar slightly offset from cursor, clamped within workArea
    let targetX = payload.x + 8;
    let targetY = payload.y + 16;

    if (targetX + toolbarWidth > workArea.x + workArea.width) {
      targetX = workArea.x + workArea.width - toolbarWidth - 10;
    }
    if (targetY + toolbarHeight > workArea.y + workArea.height) {
      targetY = payload.y - toolbarHeight - 12; // Flip above cursor
    }

    this.toolbarWindow?.setBounds({
      x: Math.round(targetX),
      y: Math.round(targetY),
      width: toolbarWidth,
      height: toolbarHeight,
    });

    this.toolbarWindow?.webContents.send('selection:updated', payload);
    this.toolbarWindow?.showInactive();
  }

  public hideToolbar() {
    if (this.toolbarWindow && !this.toolbarWindow.isDestroyed()) {
      this.toolbarWindow.hide();
    }
  }

  public showAction(actionId: string, customPrompt?: string) {
    this.hideToolbar();

    if (!this.actionWindow || this.actionWindow.isDestroyed()) {
      this.createActionWindow();
    }

    const config = configStore.get();
    const [actionWidth, actionHeight] = this.actionWindow?.getSize() || [480, 540];

    if (config.actionWindow.followToolbar && this.currentSelection) {
      const display = screen.getDisplayNearestPoint({
        x: this.currentSelection.x,
        y: this.currentSelection.y,
      });
      const workArea = display.workArea;

      let targetX = this.currentSelection.x;
      let targetY = this.currentSelection.y + 20;

      if (targetX + actionWidth > workArea.x + workArea.width) {
        targetX = workArea.x + workArea.width - actionWidth - 10;
      }
      if (targetY + actionHeight > workArea.y + workArea.height) {
        targetY = Math.max(workArea.y + 10, this.currentSelection.y - actionHeight - 10);
      }

      this.actionWindow?.setBounds({
        x: Math.round(targetX),
        y: Math.round(targetY),
        width: actionWidth,
        height: actionHeight,
      });
    }

    this.actionWindow?.webContents.send('action:start', {
      actionId,
      customPrompt,
      selection: this.currentSelection,
    });

    this.actionWindow?.show();
    this.actionWindow?.focus();
  }

  public hideActionWindow() {
    if (this.actionWindow && !this.actionWindow.isDestroyed()) {
      this.actionWindow.hide();
    }
  }

  public setPinned(pinned: boolean) {
    this.isPinned = pinned;
    if (this.actionWindow && !this.actionWindow.isDestroyed()) {
      this.actionWindow.setAlwaysOnTop(pinned);
    }
  }

  public getCurrentSelection(): SelectionPayload | null {
    return this.currentSelection;
  }

  public createTray() {
    const icon = getTrayIcon();
    this.tray = new Tray(icon);
    this.tray.setToolTip('Cherry Selection Lite - AI 划词助手');

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '设置 (Settings)',
        click: () => this.createSettingsWindow(),
      },
      {
        label: '测试划词 (Test Selection)',
        click: () => {
          this.showToolbar({
            text: 'Cherry Studio 是一个支持多模型、知识库与划词助手的 AI 桌面客户端。Cherry Selection Lite 专注于极致轻量化！',
            x: 400,
            y: 300,
            source: 'tray-test',
          });
        },
      },
      { type: 'separator' },
      {
        label: '退出 (Exit)',
        click: () => app.quit(),
      },
    ]);

    this.tray.setContextMenu(contextMenu);
    this.tray.on('double-click', () => this.createSettingsWindow());
  }
}

export const windowManager = new WindowManager();
