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
app.whenReady().then(() => {
    createWindow();
})