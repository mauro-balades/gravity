import { contextBridge, ipcRenderer } from "electron";
const { remote } = require("electron") as any;

contextBridge.exposeInMainWorld("electronAPI", {
    createNewUser: (username: string) =>
        ipcRenderer.send("create-new-user", username),
});
