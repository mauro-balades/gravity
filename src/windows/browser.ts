import { BrowserWindow, session } from "electron";
import * as path from "path";
import { IUser } from "../interfaces";
import { windowManager } from "../manager/window";

export function createBrowserWindow(user: IUser) {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            defaultEncoding: 'utf-8',
            webviewTag: true,
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "../", "preloads", "index.js"),
            // TODO:
            // partition: `persist:user-${user.id}`
        },
        minHeight: 800,
        minWidth: 600,
    });

    let id = windowManager.addWindow(mainWindow, user);

    // and load the index.html of the app.
    mainWindow.loadURL(`gravity://browser-assets/index.html?winID=${id}`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
