const {app,Menu, BrowserWindow ,Tray,ipcMain ,MenuItem}  = require('electron')
const path = require('path');
let tray;
app.whenReady().then(() => {
  const win  = BrowserWindow.getFocusedWindow();
  tray = new Tray(path.join(__static,'icon.png'));
  const menus = [
    {label: '打开主界面', click:show},
    {type:'separator',visible:false},
    {label: '锁定',visible:false},
    {label: '设置',visible:false},
    {type:'separator',visible:false},
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
  let contextMenu = Menu.buildFromTemplate(menus)

  tray.setToolTip('便签')
  tray.setContextMenu(contextMenu);
  // 监听追加菜单
  addTrayMenu();
  tray.on('click', () => {
    win.show()
  })

  function show() {
    win.show()
  }
  function addTrayMenu() {
    ipcMain.on('changeTray',function (event, args) {
      console.log(contextMenu.items[1].type);
      if(args){
        contextMenu.items[1].type = 'separator';
      }else{
        contextMenu.items[1].type = 'normal';
        contextMenu.items[1].label = '';
        contextMenu.items[1].visible = false;
      }
      console.log(contextMenu.items[1].type);
      contextMenu.items[2].visible = args;
      contextMenu.items[3].visible = args;
      contextMenu.items[6].visible = args;
      tray.setContextMenu(contextMenu)
    })
  }
})


