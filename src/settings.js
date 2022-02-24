const Store = require('electron-store');
const storage = new Store();

function getWinSettings() {
    const default_bounds = [800, 600];
    const size = storage.get('win-size');

    if (size) return size
    else {
        storage.set('win-size', default_bounds);
        return default_bounds;
    }
}

function saveBounds(bounds) {
    storage.set('win-size', bounds);
    console.log('bounds saved:', bounds);
}




module.exports = {
    getWinSettings,
    saveBounds
}