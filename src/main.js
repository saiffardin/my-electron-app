const {electron, app, BrowserWindow, Menu, MenuItem} = require('electron');
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


    // Context Menu
    const ctxMenu = new Menu();

    const ctxMenuTemplate = {

    }

    ctxMenu.append(new MenuItem({
        label: 'Hello',
        click() {
            console.log('context menu clicked');
        }
    }))

    ctxMenu.append(new MenuItem({
        role: 'selectAll'
    }))


    // now we've to attach the context menu
    // to the right click event of the window
    mainWindow.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(mainWindow, params.x, params.y);
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

// Build application menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

// insert application menu
Menu.setApplicationMenu(mainMenu)