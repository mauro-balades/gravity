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
        width: 800,
    });

    // and load the index.html of the app.
    mainWindow.loadURL("gravity://new-user");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
