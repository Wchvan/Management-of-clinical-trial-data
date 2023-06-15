'use strict';
const { app: r, BrowserWindow: c, session: l } = require('electron'),
    t = require('path'),
    s = process.env.NODE_ENV;
r.commandLine.appendSwitch(
    'disable-features',
    'BlockInsecurePrivateNetworkRequests',
    'disable-web-security',
    'ignore-certificate-errors',
);
function a() {
    const e = new c({
        width: 1280,
        height: 720,
        autoHideMenuBar: !0,
        frame: !0,
        webPreferences: {
            preload: t.join(__dirname, '../preload/index.js'),
            nodeIntegration: !0,
            contextIsolation: !0,
            webSecurity: !1,
        },
        icon: t.join(__dirname, '../../public/favicon.ico'),
    });
    e.loadURL(
        s === 'development'
            ? 'http://localhost:8080'
            : `file://${t.join(__dirname, '../../dist/index.html')}`,
    ),
        e.maximize(),
        s === 'development' && e.webContents.openDevTools();
}
r.whenReady().then(() => {
    const e = { urls: ['https://*/*'] };
    l.defaultSession.webRequest.onHeadersReceived(e, (o, i) => {
        if (o.responseHeaders && o.responseHeaders['Set-Cookie'])
            for (let n = 0; n < o.responseHeaders['Set-Cookie'].length; n++)
                o.responseHeaders['Set-Cookie'][n] += ';SameSite=None;Secure';
        i({ responseHeaders: o.responseHeaders });
    }),
        a(),
        r.on('activate', () => {
            c.getAllWindows().length === 0 && a();
        });
});
r.on('window-all-closed', () => {
    process.platform !== 'darwin' && r.quit();
});
r.on('certificate-error', (e, o, i, n, u, d) => {
    e.preventDefault(), d(!0);
});
