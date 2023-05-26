import { BrowserView } from "electron";
import * as path from "path";
import { createBrowserView } from "../browser-view";

export function createTimeDialog(id: number) {
    // Create the browser window.
    const view = createBrowserView();

    view.webContents.loadURL(
        `gravity://modals/time-dialog/index.html?winID=${id}`
    );
    view.webContents.openDevTools({ mode: "detach" })

    return view;
}
