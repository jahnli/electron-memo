const {ipcRenderer} = window.require("electron");
const {app} = window.require('electron').remote;
import router from '../router/index';

app.whenReady().then(()=>{
  // 托盘退出登录
  ipcRenderer.on('home',function () {
    if(router.currentRoute.name !== 'login'){
      router.push({path:'/login'})
    }
  })
})

export const mouseup = () =>{
  ipcRenderer.send("window-move-open", false)
}

export const mousedown = (e) =>{
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement || e.target instanceof HTMLTextAreaElement || typeof e.target.className == 'object' || e.target.className.includes('no-drag')
  ) {
    ipcRenderer.send("window-move-open", false)
    return ;
  }
  ipcRenderer.send("window-move-open", true)
}
