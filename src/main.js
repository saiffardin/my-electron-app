const path = require('path');
const {app, BrowserWindow, ipcMain, dialog} = require('electron');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, // use remote module
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('./src/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// send from renderer process (index.js)
ipcMain.on('async-event-from-renderer', (e) => {
    e.sender.send('async-event-from-main', 'param 2 text');
})

// send from renderer process (index.js)
ipcMain.on('sync-event-from-renderer', (e) => {
    // e.sender.send('async-event-from-main', 'param 2 text');
    e.returnValue = 'sync reply from main';
})