;/ * __static * /
import { app, Tray, ipcMain, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export function ipcMainOn() {
  let _win = global.__WIN__
  ipcMain.on('APP_RELAUNCH', () => {
    app.relaunch({
      args: process.argv.slice(1).concat(['--relaunch'])
    })
    app.exit(0)
  })
  ipcMain.on('MAINWIN_RELOAD', () => {
    _win.reload()
  })
  ipcMain.on('MAINWIN_CLOSE', () => {
    app.exit(0)
  })
  ipcMain.on('MAINWIN_MAX', () => {
    if (_win.isMaximized()) {
      _win.unmaximize()
    } else {
      _win.maximize()
    }
  })
  ipcMain.on('MAINWIN_MINI', () => {
    if (!_win.isMinimized()) {
      _win.minimize()
    }
  })
  ipcMain.on('MAINWIN_HIDE', () => {
    if (_win.isVisible()) {
      _win.hide()
    }
  })
  ipcMain.on('MAINWIN_SHOW', () => {
    if (!_win.isVisible()) {
      _win.show()
    }
  })
}

export function createWin() {
  let _win = null
  _win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    useContentSize: true,
    // zoomFactor: 0.5,
    // resizable: false,
    // frame: false,
    show: false,
    icon: global.__TRAY_ICON_1__,
    webPreferences: {
      plugins: true,
      webSecurity: false,
      allowDisplayingInsecureContent: true,
      allowRunningInsecureContent: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })
  _win.setMenu(null)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    _win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) _win.webContents.openDevTools()
  } else {
    createProtocol('app')
    _win.loadURL('app://./index.html')
  }
  _win.once('ready-to-show', () => {
    _win.show()
  })
  _win.on('closed', () => {
    _win = null
  })

  global.__WIN__ = _win
}

export function createTray() {
  let _win = global.__WIN__
  let _tray = null
  _tray = new Tray(global.__TRAY_ICON_1__)
  _tray.setToolTip(global.__APP_NAME__)
  _tray.on('click', () => {
    blinkTray(false)
    _win.isVisible() ? _win.hide() : _win.show()
  })
  global.__TRAY__ = _tray
}

export function blinkTray(blink = true, time = 0) {
  let _tray = global.__TRAY__
  let _tray_id = global.__TRAY_ID__
  let _tray_status = global.__TRAY_STATUS__
  clearInterval(_tray_id)
  if (!blink) return
  _tray_id = setInterval(() => {
    if (_tray_status) {
      _tray.setImage(global.__TRAY_ICON_0__)
      _tray_status = 0
    } else {
      _tray.setImage(global.__TRAY_ICON_1__)
      _tray_status = 1
    }
  }, 500)
  if (time) {
    setTimeout(() => {
      clearInterval(_tray_id)
    }, time * 1000)
  }
}
