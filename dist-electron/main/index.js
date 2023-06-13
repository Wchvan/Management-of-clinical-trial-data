'use strict';
const { app: e, BrowserWindow: r } = require('electron'),
    o = require('path'),
    i = process.env.NODE_ENV;
function t() {
    const n = new r({
        width: 1280,
        height: 720,
        autoHideMenuBar: !0,
        frame: !0,
        webPreferences: {
            preload: o.join(__dirname, '../preload/index.js'),
            nodeIntegration: !0,
            contextIsolation: !0,
        },
        icon: o.join(__dirname, '../../public/favicon.ico'),
    });
    n.loadURL(
        i === 'development'
            ? 'http://localhost:8080'
            : `file://${o.join(__dirname, '../../dist/index.html')}`,
    ),
        n.maximize(),
        i === 'development' && n.webContents.openDevTools();
}
e.whenReady().then(() => {
    t(),
        e.on('activate', () => {
            r.getAllWindows().length === 0 && t();
        });
});
e.on('window-all-closed', () => {
    process.platform !== 'darwin' && e.quit();
});
