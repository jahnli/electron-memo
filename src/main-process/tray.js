const {app,Menu, BrowserWindow ,Tray,ipcMain ,MenuItem}  = require('electron')
const path = require('path');
let tray;
app.whenReady().then(() => {
  const win  = BrowserWindow.getFocusedWindow();
  tray = new Tray(path.join(__static,'icon.png'));
  // 监听追加菜单
  addTrayMenu();
  tray.setToolTip('便签')
  tray.on('click', () => {
    win.show()
  })

  // 显示主面板
  function show() {
    win.show()
  }
  // 托盘菜单
  function addTrayMenu() {
    ipcMain.on('changeTray',function (event, args) {
      if(args){
        const completeMenus = [
          {label: '打开主界面', click:show},
          {type:'separator'},
          {
            label: '锁定',
            accelerator :'ctrl+l',
            click:()=>{
              win.webContents.send('routerSkip','lock');
            }
          },
          {label: '设置'},
          {type:'separator'},
          {label: '最小化'},
          {
            label: '退出登录',
            click:()=>{
              win.webContents.send('routerSkip','login');
            }
          },
          {
            label: '退出程序',
            click: () => {
              win.destroy();
              app.quit();
            }
          }
        ];
        let contextMenu = Menu.buildFromTemplate(completeMenus)
        tray.setContextMenu(contextMenu);
      }else{
        const baseMenu = [
          {label: '打开主界面', click:show},
          {type:'separator'},
          {label: '最小化'},
          {
            label: '退出程序',
            click: () => {
              win.destroy();
              app.quit();
            }
          }
        ]
        let contextMenu = Menu.buildFromTemplate(baseMenu)
        tray.setContextMenu(contextMenu);
      }

    })
  }
})


