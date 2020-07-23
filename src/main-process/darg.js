import {BrowserWindow, ipcMain, screen} from "electron";


/**
 * 窗口移动
 * @param win
 */

let winStartPosition = {x: 0, y: 0};
let mouseStartPosition = {x: 0, y: 0};
let movingInterval = null;
/**
 * 窗口移动事件
 */
ipcMain.on("window-move-open", (events, canMoving) => {
  if (canMoving) {
    // 读取原位置
    const winPosition = BrowserWindow.getFocusedWindow().getPosition();
    winStartPosition = { x: winPosition[0], y: winPosition[1] };
    mouseStartPosition = screen.getCursorScreenPoint();
    // 清除
    if (movingInterval) {
      clearInterval(movingInterval);
    }
    // 新开
    movingInterval = setInterval(() => {
      // 实时更新位置
      const cursorPosition = screen.getCursorScreenPoint();
      const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
      const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
      BrowserWindow.getFocusedWindow().setPosition(x, y, true);
    }, 0);
  } else {
    clearInterval(movingInterval);
    movingInterval = null;
  }
});

