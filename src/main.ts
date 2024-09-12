import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import WSClient from './service/WSClient';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  return mainWindow;
};

const wsclient = new WSClient();
app.whenReady().then(() => {
  const window = createWindow();
  ipcMain.handle('connect-to-ws', () =>  wsclient.connect(window));
  ipcMain.handle('disconnect-to-ws', () =>  wsclient.disconnect());
  ipcMain.handle('send-msg', (e, msg) => wsclient.send(msg));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
