
import { Rectangle, contextBridge, ipcRenderer } from 'electron';
import { Tab } from '../manager/tabs';

var $windowID = -1;

contextBridge.exposeInMainWorld('electronAPI', {
    setWindowID: (n: number) => $windowID = n,
    getCurrentUser: () => ipcRenderer.sendSync("get-current-user", $windowID),
    createTab: (url: string | undefined, active: boolean = false) => ipcRenderer.sendSync("create-new-tab", $windowID, url, active),
    getTabs: () => ipcRenderer.sendSync("get-all-tabs", $windowID),
    setTabBoundaries: (tabID: number, rect: Rectangle) => ipcRenderer.send("upate-webcontent-rect", $windowID, tabID, rect),
    setActiveTab: (tabID: number) => ipcRenderer.send("set-active-tab", $windowID, tabID),

    timeDialogOpen: () => ipcRenderer.send("time-dialog-open", $windowID),
    timeDialogClose: () => ipcRenderer.send("time-dialog-close", $windowID),
    timeDialogResize: (rect: Rectangle) => ipcRenderer.send("time-dialog-resize", $windowID, rect),

    addTabListener: (tabID: number, updater: any) => ipcRenderer.on(`update-tab-info-${$windowID}-${tabID}`, updater),
    addUpdateHandle: (updater: any) => ipcRenderer.on(`update-browser-${$windowID}`, updater),
})
