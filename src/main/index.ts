import { app } from 'electron';
import { windowManager } from './windowManager';
import { selectionService } from './selectionService';
import { registerIpcHandlers } from './ipcHandlers';

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

    // Create windows
    windowManager.createToolbarWindow();
    windowManager.createActionWindow();
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
