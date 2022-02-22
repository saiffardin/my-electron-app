const {app, BrowserWindow, ipcRenderer} = require('electron');

const path = require('path');

const asyncBtn = document.getElementById('asyncBtn');
const syncBtn = document.getElementById('syncBtn');

// opening window within render process
window.open('https://github.com');
// window.setAlwaysOnTop("true"); 


asyncBtn.addEventListener('click', () => {
    console.log('async 1');
    ipcRenderer.send('async-event-from-renderer');
    console.log('async 2');
});


syncBtn.addEventListener('click', () => {
    console.log('sync 1');
    const reply = ipcRenderer.sendSync('sync-event-from-renderer');
    console.log(reply);
    console.log('sync 2');
});


ipcRenderer.on('async-event-from-main', (e, arg) => {
    console.log(arg);
})