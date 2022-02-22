const {electron,app, BrowserWindow, Menu} = require('electron');
const path = require('path');

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

const mainMenuTemplate = [
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'}
        ]
    },

    {
        label: 'Demo',
        submenu: [
            {
                label: 'Submenu1',
                click: function () {
                    console.log('Clicked sub menu 1');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Submenu2'
            }
        ]
    },

    {
        label: 'Help',
        submenu: [
            {
                label: 'About Electron',
                click: function () {
                    electron.shell.openExternal('http://electron.atom.io');
                },
                accelerator: 'CmdOrCtrl + Shift + H'
            }
        ]
    }
]

// Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

// insert menu
Menu.setApplicationMenu(mainMenu)