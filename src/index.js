const {app, BrowserWindow, ipcRenderer} = require('electron');

const path = require('path');

const asyncBtn = document.getElementById('asyncBtn');
const syncBtn = document.getElementById('syncBtn');


asyncBtn.addEventListener('click', () => {
    console.log('async btn');
});


syncBtn.addEventListener('click', () => {
    console.log('sync btn');

});