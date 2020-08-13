const {ipcRenderer} = window.require("electron");
const {app} = window.require('electron').remote;
import router from '../router/index';

app.whenReady().then(()=>{
  ipcRenderer.on('routerSkip',function (event,routerName) {
    if(router.currentRoute.name !== routerName){
      router.push({
        path:`/${routerName}`
      })
    }
  })
})

export const mouseup = () =>{
  ipcRenderer.send("window-move-open", false)
}

export const mousedown = (e) =>{
  if(e.target instanceof HTMLImageElement ){
    e.preventDefault();
  }
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement || e.target instanceof HTMLTextAreaElement || typeof e.target.className == 'object' || e.target.className.includes('no-drag')
  ) {
    ipcRenderer.send("window-move-open", false)
    return ;
  }
  ipcRenderer.send("window-move-open", true)
}
