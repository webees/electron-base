import { app, protocol, nativeImage } from 'electron'

global.__WIN__ = null
global.__TRAY__ = null

global.__APP_NAME__ = ''
global.__APP_EXEC__ = process.execPath.substring(0, process.execPath.lastIndexOf('\\'))
global.__APP_VERS__ = app.getVersion()

global.__TRAY_ID__ = 0
global.__TRAY_ICON_0__ = nativeImage.createFromPath(__static + '/imgs/icon_0.ico')
global.__TRAY_ICON_1__ = nativeImage.createFromPath(__static + '/imgs/icon_1.ico')
global.__TRAY_STATUS__ = 1

if (app.requestSingleInstanceLock()) {
  let _win = global.__WIN__
  app.on('second-instance', () => {
    if (_win) {
      if (_win.isMinimized()) _win.restore()
      if (!_win.isVisible()) _win.show()
      _win.focus()
    }
  })
} else {
  app.quit()
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
