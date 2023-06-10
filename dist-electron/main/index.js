'use strict';
const { app: e, BrowserWindow: r } = require('electron'),
    o = require('path'),
    t = process.env.NODE_ENV;
function i() {
    const n = new r({
        width: 1280,
        height: 720,
        autoHideMenuBar: !0,
        frame: !0,
        webPreferences: {
            preload: o.join(__dirname, '../preload/preload.js'),
            nodeIntegration: !0,
            contextIsolation: !0,
        },
        icon: o.join(__dirname, '../../public/favicon.ico'),
    });
    n.loadURL(
        t === 'development'
            ? 'http://localhost:8080'
            : `file://${o.join(__dirname, '../../dist/index.html')}`,
    ),
        n.maximize(),
        t === 'development' && n.webContents.openDevTools();
}
e.whenReady().then(() => {
    i(),
        e.on('activate', () => {
            r.getAllWindows().length === 0 && i();
        });
});
e.on('window-all-closed', () => {
    process.platform !== 'darwin' && e.quit();
});
