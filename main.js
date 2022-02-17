const path = require('path')
const {app, BrowserWindow} = require('electron')

// The 'app' module, which controls your application's event lifecycle.
// The 'BrowserWindow' module, which creates and manages application windows.

// "createWindow()" function loads index.html into a new BrowserWindow instance.

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}


/**
 * In Electron, browser windows can only be created after the app module's ready event is fired. 
 * You can wait for this event by using the app.whenReady() API. 
 * Call createWindow() after whenReady() resolves its Promise.
 */

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})