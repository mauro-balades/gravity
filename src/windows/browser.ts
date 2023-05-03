import { session } from "electron";
import * as path from "path";
import { IUser } from "../interfaces";
import { windowManager } from "../manager/window";
const { BrowserWindow } = require("glasstron") as any;

export function createBrowserWindow(user: IUser) {
    setTimeout(
		() => {
            // Create the browser window.
            const mainWindow = new BrowserWindow({
                height: 600,
                blurType: "blurbehind",
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

            mainWindow.setBlur(true);
            let id = windowManager.addWindow(mainWindow, user);

            // and load the index.html of the app.
            mainWindow.loadURL(`gravity://browser-assets/index.html?winID=${id}`);

            // // Open the DevTools.
            mainWindow.webContents.openDevTools({ mode: 'detach' });
        },
		process.platform == "linux" ? 1000 : 0
		// Electron has a bug on linux where it
		// won't initialize properly when using
		// transparency. To work around that, it
		// is necessary to delay the window
		// spawn function.
	);
}
