import { Rectangle, contextBridge, ipcRenderer } from "electron";
import { Tab } from "../manager/tabs";

var $windowID = -1;
var $tabListeners: { id: number; listeners: [(x: Tab) => void] }[] = [];

contextBridge.exposeInMainWorld("electronAPI", {
    setWindowID: (n: number) => ($windowID = n),
    getCurrentUser: () => ipcRenderer.sendSync("get-current-user", $windowID),
    createTab: (url: string | undefined, active: boolean = false) =>
        ipcRenderer.sendSync("create-new-tab", $windowID, url, active),
    getTabs: () => ipcRenderer.sendSync("get-all-tabs", $windowID),
    getTab: (i: number) => ipcRenderer.sendSync("get-tab", $windowID, i),
    setTabBoundaries: (tabID: number, rect: Rectangle) =>
        ipcRenderer.send("upate-webcontent-rect", $windowID, tabID, rect),
    setActiveTab: (tabID: number) =>
        ipcRenderer.send("set-active-tab", $windowID, tabID),

    timeDialogOpen: () => ipcRenderer.send("time-dialog-open", $windowID),
    timeDialogClose: () => ipcRenderer.send("time-dialog-close", $windowID),
    timeDialogResize: (rect: Rectangle) =>
        ipcRenderer.send("time-dialog-resize", $windowID, rect),

    omniboxResize: (tabID: number, rect: Rectangle) =>
        ipcRenderer.send("omnibox-resize", $windowID, tabID, rect),

    addTabListener: (tabID: number, updater: any) => {
        let t = $tabListeners.find((x) => x.id == tabID);
        if (t === undefined) {
            $tabListeners.push({ id: tabID, listeners: [updater] });
        } else {
            t.listeners.push(updater);
        }

        let channel = `update-tab-info-${$windowID}-${tabID}`;
        if (ipcRenderer.eventNames().find((c) => c === channel) === undefined) {
            ipcRenderer.on(channel, (event, tab: Tab) => {
                console.log($tabListeners);
                let t = $tabListeners.find((x) => x.id == tabID);

                for (let i = 0; i < t.listeners.length; i++) {
                    t.listeners[i](tab);
                }
            });
        }
    },
    addUpdateHandle: (updater: any) =>
        ipcRenderer.on(`update-browser-${$windowID}`, updater),

    // Tab functions
    reloadTab: (tabID: number, ignoreCache: boolean) =>
        ipcRenderer.send("tab:reload", $windowID, tabID, ignoreCache),
});
