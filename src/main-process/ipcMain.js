import { app, BrowserWindow ,ipcMain} from 'electron'
let mainWin = BrowserWindow.fromId(1);
ipcMain.on('setMainWin',args=>{
  let arr = mainWin.getSize();
  mainWin.setSize(arr[0],110)
  mainWin.setmin
});
console.log();
