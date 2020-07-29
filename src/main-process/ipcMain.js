import { app, BrowserWindow ,screen,ipcMain,globalShortcut} from 'electron'

app.whenReady().then(() => {
  let mainWin = BrowserWindow.fromId(1);

  ipcMain.on('min', () => mainWin.minimize());
  // 收起展开
  ipcMain.on('setMainWin', (event,bounds) => {
    mainWin.setBounds(bounds)
  });
  ipcMain.on('close', () => mainWin.hide());

  // 开机启动
  ipcMain.on('autoStart', (event,args) => {
    app.setLoginItemSettings({
      openAtLogin: args
    })
  });


  // 拖拽
  require('./darg');
})

