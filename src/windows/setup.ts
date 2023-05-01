import { BrowserWindow } from "electron";
import * as path from "path";

export function createSetUpWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            defaultEncoding: 'utf-8',
            webviewTag: false,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nodeIntegration: false,
            contextIsolation: true
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

    // and load the index.html of the app.
    mainWindow.loadURL("gravity://new-user");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
