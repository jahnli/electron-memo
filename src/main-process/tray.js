const {app,Menu, BrowserWindow ,Tray,ipcMain ,MenuItem}  = require('electron')
const path = require('path');
const fs = require('fs');
const os = require('os');
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
      tray.setImage(path.join(__static,'icon.png'))
      if(args){
        const completeMenus = [
          {label: '打开主界面', click:show},
          {type:'separator'},
          {
            label: '锁定',
            click:()=>{
              win.webContents.send('resetSize');
              win.webContents.send('routerSkip','lock');
              tray.setImage(path.join(__static,'icon-lock.png'))
            }
          },
          {label: '设置'},
          {type:'separator'},
          {
            label: '最小化',
            click:()=>{
              win.hide();
            }
          },
          {
            label: '退出登录',
            click:()=>{
              win.webContents.send('routerSkip','login');
              try {
                let configPath = path.join(os.homedir(),"/AppData/Local/", 'config.json');
                let config = fs.readFileSync(configPath);
                if(config){
                  let res  = JSON.parse(config);
                  let type = res.type.length >= 1 ? ['1']:[]
                  fs.writeFile(configPath,JSON.stringify({...res,type}),err=>{})
                }
              }catch (e) {
                console.log(e);
              }
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


