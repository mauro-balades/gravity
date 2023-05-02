import { BrowserWindow, session } from "electron";
import * as path from "path";
import { IUser } from "../interfaces";

export function createBrowserWindow(user: IUser) {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            defaultEncoding: 'utf-8',
            webviewTag: false,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../", "preloads", "index.js"),
            // session: session.fromPartition(`user-${user.id}`)
        },
        minHeight: 800,
        minWidth: 600,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`gravity://browser-assets/index.html?user=${encodeURIComponent(JSON.stringify(user))}`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
