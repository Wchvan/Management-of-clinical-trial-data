// electron/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

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
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
