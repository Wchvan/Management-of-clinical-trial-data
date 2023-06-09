'use strict';
const { app: e, BrowserWindow: r } = require('electron'),
    n = require('path'),
    t = process.env.NODE_ENV;
function i() {
    const o = new r({
        width: 1280,
        height: 720,
        autoHideMenuBar: !0,
        frame: !0,
        webPreferences: {
            preload: n.join(__dirname, '../preload/preload.js'),
            nodeIntegration: !0,
            contextIsolation: !1,
        },
        icon: n.join(__dirname, '../../public/favicon.ico'),
    });
    o.loadURL(
        t === 'development'
            ? 'http://localhost:8080'
            : `file://${n.join(__dirname, '../dist/index.html')}`,
    ),
        t === 'development' && o.webContents.openDevTools();
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
