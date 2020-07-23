const {app,Menu, BrowserWindow ,Tray }  = require('electron')
const path = require('path');
let tray;
app.whenReady().then(() => {
  const win  = BrowserWindow.getFocusedWindow();
  tray = new Tray(path.join(__static,'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: '打开主界面', click:show},
    {type:'separator'},
    {label: '锁定'},
    {label: '设置'},
    {type:'separator'},
    {label: '最小化'},
    {label: '退出登录'},
    {
      label: '退出程序',
      click: () => {
        win.destroy();
        app.quit();
      }
    }
  ])

  tray.setToolTip('便签')
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    win.show()
  })
  function show() {
    win.show()
  }
})

