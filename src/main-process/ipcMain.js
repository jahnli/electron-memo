import { app, BrowserWindow ,ipcMain} from 'electron'
let mainWin = BrowserWindow.fromId(1);

ipcMain.on('min', () => mainWin.minimize());
// 收起展开
ipcMain.on('collapse', () => {

});
ipcMain.on('close', () => mainWin.hide());


ipcMain.on('setMainWin',args=>{
  // let arr = mainWin.getSize();
  // mainWin.setSize(arr[0],110)
});
