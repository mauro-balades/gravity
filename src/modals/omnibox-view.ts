import { BrowserView } from "electron";
import path = require("path");

export function createOmniboxView() {
    const view = new BrowserView({
        webPreferences: {
            contextIsolation: true,
            webviewTag: false,
            defaultEncoding: "utf-8",
            nodeIntegration: false,
            scrollBounce: true,
            navigateOnDragDrop: true,
            safeDialogs: true,
            preload: path.join(__dirname, "../", "preloads", "index.js"),
        },
    });

    // view.webContents.openDevTools({ mode: "detach" });
    return view;
}

export function loadOmniboxURL(
    view: BrowserView,
    winID: number,
    tabID: number
) {
    view.webContents.loadURL(
        `gravity://sub-windows/omnibox/index.html?winID=${winID}&tabID=${tabID}`
    );
}
