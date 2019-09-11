import {
  app,
  globalShortcut
} from 'electron'
// import {
//   installVueDevtools
// } from 'vue-cli-plugin-electron-builder/lib'
import {
  createWin,
  createTray,
  ipcMainOn
} from './fun'

app.on('ready', async () => {
  if (process.env.NODE_ENV !== 'production' && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWin()
  createTray() // 托盘图标
  ipcMainOn() // 进程监听

  if (process.env.NODE_ENV !== 'production') {
    globalShortcut.register('Shift+i', () => {
      global._win.main.webContents.openDevTools()
    })
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (global.__WIN__ === null) {
    createWin()
  }
})

// Exit cleanly on request from parent process in development mode.
if (process.env.NODE_ENV !== 'production') {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
