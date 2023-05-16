import { BrowserWindow } from "electron";
import { IUser, IWindow } from "../interfaces";
import { logger } from "../logger";
import { TabManager } from "./tabs";
import { createTimeDialog } from "../modals/time-dialog";

export class WindowManager {
    private windows: IWindow[] = [];
    private latestId: number = 0;

    constructor() {}

    public addWindow(win: BrowserWindow, user: IUser): number {
        // TODO: dialogs should be for each tab!
        this.windows.push({
            window: win,
            id: ++this.latestId,
            user,
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

        // TODO: move all sub-dialogs to top level
        // w.window.removeBrowserView(w.timeDialog);
        // w.window.addBrowserView(w.timeDialog);

        w.window.webContents.send(`update-browser-${id}`);
    }
}

export const windowManager = new WindowManager();
