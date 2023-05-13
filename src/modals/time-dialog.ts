import { BrowserView } from "electron";
import * as path from "path";

export function createTimeDialog(id: number) {
    // Create the browser window.
    const view = new BrowserView({
        webPreferences: {
            defaultEncoding: 'utf-8',
            webviewTag: false,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../", "preloads", "index.js"),
        },
    });

    // and load the index.html of the app.
    // view.setBackgroundColor("#00FFFFFF")
    view.webContents.loadURL(`gravity://modals/time-dialog/index.html?winID=${id}`);
    // view.webContents.openDevTools({ mode: "detach" })

    return view;
}
