const {ipcRenderer} = window.require("electron");

export const mouseup = () =>{
  ipcRenderer.send("window-move-open", false)
}

export const mousedown = (e) =>{
  console.log(e.target);
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement || e.target instanceof HTMLTextAreaElement || typeof e.target.className == 'object' || e.target.className.includes('no-drag')
  ) {
    ipcRenderer.send("window-move-open", false)
    return ;
  }
  ipcRenderer.send("window-move-open", true)
}
