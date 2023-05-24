import * as path from "path";
import { createBrowserView } from "../browser-view";
import { IDialog, IDialogShowOptions, IWindow } from "../interfaces";
import { Tab } from "../manager/tabs";
import { TabManager } from "../manager/tabs";
import { prepareAlertDialog } from "./alert";
import { Rectangle, ipcMain } from "electron";

export function addDialogsToTab(w: IWindow, tab: Tab) {
    const manager = w.tabs;
    manager.addNewDialog(prepareAlertDialog(w.id, tab.id));
}

export function createDialogInstance(options: IDialogShowOptions): IDialog {
    const { type, devtools, association, onWindowBoundsUpdate } = options;

    let view = createBrowserView();
    view.webContents.loadURL(`gravity://dialogs/${type}/index.html?winID=${options.association.windowID}`);

    if (devtools) {
        view.webContents.openDevTools({ mode: "detach" });
    }

    return {
        type,
        view,
        tabID: association.tabID,
        handle: (name, cb) => {
            const channel = `${name}-${type}-${association.windowID}-${association.tabID}`;
            ipcMain.handle(channel, (...args) => cb(...args));
        },
        on: (name, cb) => {
            const channel = `${name}-${type}-${association.windowID}-${association.tabID}`;
            console.log(channel)
            ipcMain.on(channel, (...args) => cb(...args));
        },
        rearrange: (rect: Rectangle = {x: 0, y: 0, width: 0, height: 0}) => {
            view.setBounds(rect);
        }
    };
}
