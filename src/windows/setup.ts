import { BrowserWindow } from "electron";
import * as path from "path";

export function createSetUpWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
    });

    // and load the index.html of the app.
    mainWindow.loadURL("gravity://new-user");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
