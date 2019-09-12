/* global __static */
import { app, protocol, nativeImage } from 'electron'

global.__WIN__ = {
  main: null
}
global.__TRAY__ = {
  obj: null,
  id: 0,
  status: 1,
  icon_0: nativeImage.createFromPath(__static + '/imgs/icon_0.ico'),
  icon_1: nativeImage.createFromPath(__static + '/imgs/icon_1.ico'),
}
global.__APP__ = {
  name: '',
  exec: process.execPath.substring(0, process.execPath.lastIndexOf('\\')),
  vers: app.getVersion()
}

if (app.requestSingleInstanceLock()) {
  let _winMain = global.__WIN__.main
  app.on('second-instance', () => {
    if (_winMain) {
      if (_winMain.isMinimized()) _winMain.restore()
      if (!_winMain.isVisible()) _winMain.show()
      _winMain.focus()
    }
  })
} else {
  app.quit()
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
