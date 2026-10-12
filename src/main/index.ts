import { app } from 'electron';
import { windowManager } from './windowManager';
import { selectionService } from './selectionService';
import { registerIpcHandlers } from './ipcHandlers';

// Process and Memory Optimizations
app.setName('Cherry Selection Lite');
app.commandLine.appendSwitch('renderer-process-limit', '2');
app.commandLine.appendSwitch('disable-features', 'SpareRendererForSitePerProcess,CalculateNativeWinOcclusion');
app.commandLine.appendSwitch('high-dpi-support', '1');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=128');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    windowManager.createSettingsWindow();
  });

  app.whenReady().then(() => {
    registerIpcHandlers();

    // Lazy load: only create toolbar window and tray at startup
    windowManager.createToolbarWindow();
    windowManager.createTray();

    // Wire selection service to window manager
    selectionService.setOnSelection((payload) => {
      windowManager.showToolbar(payload);
    });

    // Register global shortcuts
    selectionService.registerShortcuts();

    app.on('activate', () => {
      windowManager.createSettingsWindow();
    });
  });

  app.on('will-quit', () => {
    selectionService.destroy();
  });

  app.on('window-all-closed', () => {
    // Keep app running in the background/tray for global selection
  });
}
