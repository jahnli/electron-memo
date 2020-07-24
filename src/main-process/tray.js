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

  function show() {
    win.show()
  }
  function addTrayMenu() {
    ipcMain.on('changeTray',function (event, args) {
      if(args){
        const completeMenus = [
          {label: '打开主界面', click:show},
          {type:'separator'},
          {label: '锁定'},
          {label: '设置'},
          {type:'separator'},
          {label: '最小化'},
          {
            label: '退出登录',
            click:()=>{
              win.webContents.send('home');
            },
            visible:false
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


