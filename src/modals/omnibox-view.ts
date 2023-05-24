import { BrowserView } from "electron";
import path = require("path");
import { createBrowserView } from "../browser-view";

export function createOmniboxView() {
    const view = createBrowserView();

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
