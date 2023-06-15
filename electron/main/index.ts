// electron/main.js
const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
app.commandLine.appendSwitch(
    'disable-features',
    'BlockInsecurePrivateNetworkRequests',
    'disable-web-security',
);
// 忽略证书相关错误 在ready前使用
app.commandLine.appendSwitch('ignore-certificate-errors');

function createWindow() {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true, // 自动隐藏菜单栏
        frame: true, // 边框窗口
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'), // 隔离vite和Electron之间的状态
            nodeIntegration: true, // 使用页面中可以引入node和electron相关的API
            contextIsolation: true, // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本
            webSecurity: false,
        },
        icon: path.join(__dirname, '../../public/favicon.ico'),
    });

    // 主窗体要加载的url
    mainWindow.loadURL(
        NODE_ENV === 'development'
            ? 'http://localhost:8080'
            : `file://${path.join(__dirname, '../../dist/index.html')}`,
    );

    mainWindow.maximize();

    // 打开开发工具
    if (NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    const filter = { urls: ['https://*/*'] };
    session.defaultSession.webRequest.onHeadersReceived(
        filter,
        (details, callback) => {
            if (
                details.responseHeaders &&
                details.responseHeaders['Set-Cookie']
            ) {
                for (
                    let i = 0;
                    i < details.responseHeaders['Set-Cookie'].length;
                    i++
                ) {
                    details.responseHeaders['Set-Cookie'][i] +=
                        ';SameSite=None;Secure';
                }
            }
            callback({ responseHeaders: details.responseHeaders });
        },
    );

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
