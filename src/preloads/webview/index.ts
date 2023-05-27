import { ipcRenderer, contextBridge, webFrame } from "electron";

function setupUserInputs(winID: number, tabID: number) {
    // let win = await webFrame.executeJavaScript("window");
    // let windowTitle = win.frameElement ? "A page inserted in this" : win.location.host;

    contextBridge.exposeInMainWorld("__internalGravityInputs__", {
        alert: (message: string, title: string) => {
            return ipcRenderer.sendSync(
                "page-alert-dialog",
                winID,
                tabID,
                message,
                title,
            );
        },
        confirm: (message: string, title: string) => {
            return ipcRenderer.sendSync(
                "page-confirm-dialog",
                winID,
                tabID,
                message,
                title,
            );
        },
    });
    webFrame.executeJavaScript(`
Object.defineProperty(window, 'alert', {
    get: () => (message) => window.__internalGravityInputs__.alert(message, window.frameElement ? "A page inserted in this" : window.location.host),
    set: () => {}
});

Object.defineProperty(window, 'confirm', {
    get: () => (message) => window.__internalGravityInputs__.confirm(message, window.frameElement ? "A page inserted in this" : window.location.host),
    set: () => {}
});

undefined
  `);
}

ipcRenderer.once("tab:dialogs-info", (event, winID, tabID) => {
    setupUserInputs(winID, tabID);
});
