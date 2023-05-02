
import { contextBridge, ipcRenderer } from 'electron';

var $windowID = -1;

contextBridge.exposeInMainWorld('electronAPI', {
    setWindowID: (n: number) => $windowID = n,
    getCurrentUser: () => ipcRenderer.sendSync("get-current-user", $windowID)
})
