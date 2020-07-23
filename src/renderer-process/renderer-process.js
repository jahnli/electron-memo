const {ipcRenderer} = window.require("electron");

export const mouseup = () =>{
  ipcRenderer.send("window-move-open", false)
}

export const mousedown = (e) =>{
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement || e.target instanceof HTMLTextAreaElement || e.target.className.includes('no-drag')
  ) {
    ipcRenderer.send("window-move-open", false)
    return ;
  }
  ipcRenderer.send("window-move-open", true)
}
