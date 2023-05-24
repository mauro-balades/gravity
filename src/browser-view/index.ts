import { BrowserView } from "electron";
import path = require("path");

export function createBrowserView(preload: string = "index.js") {
    return new BrowserView({
        webPreferences: {
            contextIsolation: true,
            webviewTag: false,
            defaultEncoding: "utf-8",
            nodeIntegration: false,
            scrollBounce: true,
            navigateOnDragDrop: true,
            safeDialogs: true,
            preload: path.join(__dirname, "../", "preloads", preload),
        },
    });
}
