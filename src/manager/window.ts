import { BrowserWindow } from "electron";
import { IDialog, IUser, IWindow } from "../interfaces";
import { logger } from "../logger";
import { Tab, TabManager } from "./tabs";
import { createTimeDialog } from "../modals/time-dialog";

export class WindowManager {
    private windows: IWindow[] = [];
    private latestId: number = 0;

    constructor() {}

    public get allWindows() {
        return this.windows;
    }

    public addWindow(win: BrowserWindow, user: IUser): number {
        // TODO: dialogs should be for each tab!
        this.windows.push({
            window: win,
            id: ++this.latestId,
            user,
            incognito: false, // TODO:
            tabs: new TabManager(win),
            timeDialog: createTimeDialog(this.latestId),
        });

        logger.i(
            "Succesfully created new browser window with id: " + this.latestId
        );
        return this.latestId;
    }

    public getWindow(id: number): IWindow | undefined {
        return this.windows.find((x) => x.id == id);
    }

    public updateWindow(id: number) {
        let w = this.getWindow(id);

        let event = `update-browser-${id}`;
        w.window.webContents.send(event);

        w.tabs.tabs.forEach((t: Tab) => {
            w.tabs.getOmniboxView(t.id).webContents.send(event);
            w.tabs.getAllDialogs(t.id).forEach((value: IDialog) => {
                value.view.webContents.send(event);
            });
        });
    }
}

export const windowManager = new WindowManager();
