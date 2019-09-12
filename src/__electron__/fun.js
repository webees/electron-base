; / * __static * /
import { app, Tray, ipcMain, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export function ipcMainOn() {
  let _winMain = global.__WIN__.main
  ipcMain.on('APP_RELAUNCH', () => {
    app.relaunch({
      args: process.argv.slice(1).concat(['--relaunch'])
    })
    app.exit(0)
  })
  ipcMain.on('MAINWIN_RELOAD', () => {
    _winMain.reload()
  })
  ipcMain.on('MAINWIN_CLOSE', () => {
    app.exit(0)
  })
  ipcMain.on('MAINWIN_MAX', () => {
    if (_winMain.isMaximized()) {
      _winMain.unmaximize()
    } else {
      _winMain.maximize()
    }
  })
  ipcMain.on('MAINWIN_MINI', () => {
    if (!_winMain.isMinimized()) {
      _winMain.minimize()
    }
  })
  ipcMain.on('MAINWIN_HIDE', () => {
    if (_winMain.isVisible()) {
      _winMain.hide()
    }
  })
  ipcMain.on('MAINWIN_SHOW', () => {
    if (!_winMain.isVisible()) {
      _winMain.show()
    }
  })
}

export function createWin() {
  let _winMain = null
  _winMain = new BrowserWindow({
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
  _winMain.setMenu(null)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    _winMain.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) _winMain.webContents.openDevTools()
  } else {
    createProtocol('app')
    _winMain.loadURL('app://./index.html')
  }
  _winMain.once('ready-to-show', () => {
    _winMain.show()
  })
  _winMain.on('closed', () => {
    _winMain = null
  })

  global.__WIN__.main = _winMain
}

export function createTray() {
  let _tray = null
  let _winMain = global.__WIN__.main
  let _trayIcon1 = global.__TRAY__.icon_1
  let _appName = global.__APP__.name
  _tray = new Tray(_trayIcon1)
  _tray.setToolTip(_appName)
  _tray.on('click', () => {
    blinkTray(false)
    _winMain.isVisible() ? _winMain.hide() : _winMain.show()
  })
  global.__TRAY__.obj = _tray
}

export function blinkTray(blink = true, time = 0) {
  let _tray = global.__TRAY__.obj
  let _trayID = global.__TRAY__.id
  let _trayStatus = global.__TRAY__.tatus
  let _trayIcon0 = global.__TRAY__.icon_0
  let _trayIcon1 = global.__TRAY__.icon_1
  clearInterval(_trayID)
  if (!blink) return
  _trayID = setInterval(() => {
    if (_trayStatus) {
      _tray.setImage(_trayIcon0)
      _trayStatus = 0
    } else {
      _tray.setImage(_trayIcon1)
      _trayStatus = 1
    }
  }, 500)
  if (time) {
    setTimeout(() => {
      clearInterval(_trayID)
    }, time * 1000)
  }
}
