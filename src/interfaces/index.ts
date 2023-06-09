import {
    BrowserView,
    BrowserWindow,
    Dialog,
    Rectangle,
    WebContents,
} from "electron";
import { TabManager } from "../manager/tabs";

export interface ITheme {
    id: number;
    light: boolean;
    button_radius: string;
    input_radius: string;
    dialog_radius: string;
    primary_color: string;
    secondary_color: string;
    primary_background: string;
    secondary_background: string;
    name: string;
}

export interface IHistoryItem {
    id?: number;
    title: string;
    url: string;
    date: number;
    favicon?: string;
    userID: number;
}

export interface ISiteDataEntry {
    origin: string
    key: any
    value?: any
    userID?: number
}

export interface IUser {
    id: number;
    name: string;
    theme_id: number;
    theme: ITheme;
    defaultTab: string;
    history: IHistoryItem[];
}

export interface IWindow {
    user: IUser;
    window: BrowserWindow;
    id: number;
    tabs: TabManager;

    incognito: boolean;

    timeDialog: BrowserView;
}

export interface IDialogShowOptions {
    type: DialogType;
    association: {
        tabID: number;
        windowID: number;
    };

    devtools?: boolean;
    onWindowBoundsUpdate?: (disposition: Rectangle) => void;
}

export type DialogType = "alert" | "confirm";

export interface IDialog {
    tabID: number;

    view: BrowserView;
    type: DialogType;

    url: string;
    initialized: boolean;

    handle: (name: string, cb: (...args: any[]) => any) => void;
    on: (name: string, cb: (...args: any[]) => any) => void;
    rearrange: (bounds?: Rectangle) => void;
}
