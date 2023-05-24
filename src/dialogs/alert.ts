import { BrowserView } from "electron";
import { IDialog } from "../interfaces";
import { createBrowserView } from "../browser-view";
import path = require("path");
import { createDialogInstance } from ".";

export function prepareAlertDialog(windowID: number, tabID: number): IDialog {
    return createDialogInstance({
        type: "alert",
        association: {
            windowID,
            tabID,
        },
        devtools: true,
    });
}
