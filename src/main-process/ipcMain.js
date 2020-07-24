import { app, BrowserWindow ,screen,ipcMain,globalShortcut} from 'electron'

app.whenReady().then(() => {

  let mainWin = BrowserWindow.fromId(1);
  ipcMain.on('min', () => mainWin.minimize());
  // 收起展开
  ipcMain.on('setMainWin', (event,bounds) => {
    mainWin.setBounds(bounds)
  });
  ipcMain.on('close', () => mainWin.hide());

  // 拖拽
  require('./darg');
})
