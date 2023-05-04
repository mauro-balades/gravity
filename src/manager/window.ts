import { BrowserWindow } from "electron";
import { IUser, IWindow } from "../interfaces";
import { logger } from "../logger";
import { TabManager } from "./tabs";

export class WindowManager {
    private windows: IWindow[] = [];
    private latestId: number = 0;

    constructor() {}

    public addWindow(win: BrowserWindow, user: IUser): number {
        this.windows.push({ window: win, id: ++this.latestId, user, tabs: new TabManager() })
        logger.i("Succesfully created new browser window with id: " + this.latestId);
        return this.latestId;
    }

    public getWindow(id: number): IWindow | undefined {
        return this.windows.find((x) => x.id == id);
    }
}

export const windowManager = new WindowManager();
