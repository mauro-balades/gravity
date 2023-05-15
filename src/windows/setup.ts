import * as path from "path";
import { BrowserWindow } from "electron";

export function createSetUpWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            defaultEncoding: "utf-8",
            webviewTag: false,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../", "preloads", "setup.js"),
        },
        alwaysOnTop: true,
        center: true,
        frame: false,
        maximizable: false,
        maxHeight: 600,
        maxWidth: 600,
        minHeight: 800,
        minWidth: 600,
        width: 800,
        resizable: false,
    });

    mainWindow.setBackgroundColor("#fff");

    // and load the index.html of the app.
    mainWindow.loadURL("gravity://new-user");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
