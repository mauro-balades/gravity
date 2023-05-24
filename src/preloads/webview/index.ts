import { ipcRenderer, contextBridge, webFrame } from "electron";

function setupUserInputs(winID: number, tabID: number) {
    contextBridge.exposeInMainWorld("__internalGravityInputs__", {
        alert: (message: String) => {
            return ipcRenderer.sendSync(
                "page-alert-dialog",
                message,
                winID,
                tabID
            );
        },
    });
    webFrame.executeJavaScript(`
  Object.defineProperty(window, 'alert', {
    get: () => (message) => window.__internalGravityInputs__.alert(message),
    set: () => {}
  });
  undefined
  `);
}

ipcRenderer.once("tab:dialogs-info", (event, winID, tabID) => {
    setupUserInputs(winID, tabID);
});
