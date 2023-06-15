'use strict';
const { app: n, BrowserWindow: a, session: c } = require('electron'),
    t = require('path'),
    i = process.env.NODE_ENV;
n.commandLine.appendSwitch(
    'disable-features',
    'BlockInsecurePrivateNetworkRequests',
    'disable-web-security',
    'ignore-certificate-errors',
);
function s() {
    const e = new a({
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
        i === 'development'
            ? 'http://localhost:8080'
            : `file://${t.join(__dirname, '../../dist/index.html')}`,
    ),
        e.maximize(),
        i === 'development' && e.webContents.openDevTools();
}
n.whenReady().then(() => {
    const e = { urls: ['https://*/*'] };
    c.defaultSession.webRequest.onHeadersReceived(e, (o, d) => {
        if (o.responseHeaders && o.responseHeaders['Set-Cookie'])
            for (let r = 0; r < o.responseHeaders['Set-Cookie'].length; r++)
                o.responseHeaders['Set-Cookie'][r] += ';SameSite=None;Secure';
        d({ responseHeaders: o.responseHeaders });
    }),
        s(),
        n.on('activate', () => {
            a.getAllWindows().length === 0 && s();
        });
});
n.on('window-all-closed', () => {
    process.platform !== 'darwin' && n.quit();
});
