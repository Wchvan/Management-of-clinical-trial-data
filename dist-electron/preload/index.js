'use strict';
const o = require('electron'),
    n = (e) => {
        o.ipcRenderer.invoke('on-show-msg-box', e);
    },
    s = (e) => {
        o.ipcRenderer.invoke('on-save', e);
    };
o.contextBridge.exposeInMainWorld('electronApi', { save: s, showMsgBox: n });
