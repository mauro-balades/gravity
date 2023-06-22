import { app, BrowserView, BrowserWindow, ipcMain } from "electron";
import { createNewUser, history, sitedata } from "../storage";
import { createBrowserWindow } from "../windows/browser";
import { windowManager } from "../manager/window";
import { logger } from "../logger";
import { Tab } from "../manager/tabs";
import { createOmniboxView, loadOmniboxURL } from "../modals/omnibox-view";
import path = require("path");
import setContextMenu from "../context-menu";
import { addDialogsToTab } from "../dialogs";
import { showDialog } from "./dialog";
import { DialogType, IDialog, IHistoryItem, ISiteDataEntry, IWindow } from "../interfaces";

export default function () {
    ipcMain.on("create-new-user", async (event, username) => {
        logger.i("Creaing new user called " + username);
        let user = await createNewUser(username);
        logger.v("Opening browser window with new profile created...");
        createBrowserWindow(user);

        setTimeout(
            () => {
                logger.v("Closing window used for profile setup");
                BrowserWindow.getFocusedWindow().close(); // We assume it's the user creation modal
            },
            process.platform == "linux" ? 1000 : 0
            // Electron has a bug on linux where it
            // won't initialize properly when using
            // transparency. To work around that, it
            // is necessary to delay the window
            // spawn function.
        );
    });

    ipcMain.on("get-current-user", (event, winID) => {
        let win = windowManager.getWindow(winID);
        let user = win.user;

        event.returnValue = user;
    });

    ipcMain.on("create-new-tab", (event, winID, url, active) => {
        let win = windowManager.getWindow(winID);
        let loadedURL = url ?? win.user.defaultTab;
        logger.i("Creating new tab with URL: " + loadedURL);
        let isGravity = loadedURL.startsWith("gravity://");

        const view = new BrowserView({
            webPreferences: {
                contextIsolation: true,
                webviewTag: false,
                defaultEncoding: "utf-8",
                nodeIntegration: false,
                scrollBounce: true,
                navigateOnDragDrop: true,
                nodeIntegrationInSubFrames: true,
                safeDialogs: true,
                preload: isGravity
                    ? path.join(__dirname, "..", "preloads", "index.js")
                    : path.join(
                          __dirname,
                          "..",
                          "preloads",
                          "webview",
                          "index.js"
                      ),
                sandbox: true,
                //partition: 'persist:view',
                plugins: true,
                webSecurity: true,
                javascript: true,
            },
        });

        win.window.addBrowserView(view);
        // view.setBackgroundColor("#fff");

        setContextMenu(view.webContents, winID);
        view.webContents.loadURL(
            isGravity ? loadedURL + `?winID=${win.id}` : loadedURL
        );

        let t = new Tab(loadedURL, view);
        let omnibox = createOmniboxView();
        win.tabs.addTab(t, { view, omnibox });
        win.tabs.changeTab(t.id);

        addDialogsToTab(win, t);

        t.setContext({
            updater: () => {
                // TODO: call this once the pages loades (only one time)
                view.webContents.send("tab:dialogs-info", win.id, t.id);

                let channel = `update-tab-info-${win.id}-${t.id}`;
                let normalized = t.asObject();

                win.window.webContents.send(channel, normalized);
                omnibox.webContents.send(channel, normalized);
            },
            updateHistoy: (url: string, inPage: boolean = false) => {
                if ((t.lastURL !== url) && (!win.incognito) && (!url.startsWith("gravity://"))) {
                    history.appendHistoryItem({
                        userID: win.user.id,
                        title: t.title,
                        url: t.URL,
                        date: new Date().getDate(),
                    } as IHistoryItem);
                }
            },
            updateSiteData: (data: ISiteDataEntry) => {
                sitedata.appendSiteDataItem({ userID: win.user.id, ...data })
            }
        });

        if (isGravity) {
            view.webContents.ipc.on("omnibox:activate-focus", () => {
                omnibox.webContents.focus();
                omnibox.webContents.send("omnibox:activate-focus");
            });
        } else {
            view.setBackgroundColor("#fff");
        }

        loadOmniboxURL(omnibox, winID, t.id);
        win.window.addBrowserView(omnibox);

        view.webContents.setWindowOpenHandler((details: any) => {
            ipcMain.emit(
                "create-new-tab",
                /* event = */ {},
                winID,
                details.url,
                true
            );

            return {action: 'deny'}
        });

        windowManager.updateWindow(win.id);
        event.returnValue = t.asObject();
    });

    ipcMain.on("set-active-tab", (event, winID, tabID) => {
        let win = windowManager.getWindow(winID);
        win.tabs.changeTab(tabID);

        windowManager.updateWindow(win.id);
    });

    ipcMain.on("get-all-tabs", (event, winID) => {
        let win = windowManager.getWindow(winID);
        event.returnValue = win.tabs.tabs.map((x: Tab) => x.asObject());
    });

    ipcMain.on("history:fetch", (event, winID) => {
        let win = windowManager.getWindow(winID);
        let data = history.getHistoryItems(win.user);
        event.returnValue = data;
    });

    ipcMain.on("get-tab", (event, winID, tabID) => {
        let win = windowManager.getWindow(winID);
        let tab = win.tabs.getTab(tabID);
        event.returnValue = tab.asObject();
    });

    ipcMain.on("tab:reload", (event, winID, tabID, ignoreCache = false) => {
        let win = windowManager.getWindow(winID);
        let webContents = win.tabs.getTabView(tabID).webContents;
        if (ignoreCache) {
            webContents.reloadIgnoringCache();
        } else {
            webContents.reload();
        }
    });

    ipcMain.on("tab:goBack", (event, winID, tabID) => {
        let win = windowManager.getWindow(winID);
        let webContents = win.tabs.getTabView(tabID).webContents;
        webContents.goBack();
    });

    ipcMain.on("tab:goForward", (event, winID, tabID) => {
        let win = windowManager.getWindow(winID);
        let webContents = win.tabs.getTabView(tabID).webContents;
        webContents.goForward();
    });

    ipcMain.on("time-dialog-open", (event, winID) => {
        let win = windowManager.getWindow(winID);
        win.window.addBrowserView(win.timeDialog);
        win.timeDialog.webContents.focus();
    });

    ipcMain.on("time-dialog-close", (event, winID) => {
        let win = windowManager.getWindow(winID);
        win.window.removeBrowserView(win.timeDialog);
    });

    const pageDialog = (type: DialogType) => {
        ipcMain.on(`page-${type}-dialog`, async (event, winID, tabID, message, title) => {
            let win = windowManager.getWindow(winID);
            let dialog = win.tabs.getDialogWithType(tabID, type);
    
            event.returnValue = await showDialog(win, dialog, {message, title});
        });
    }

    pageDialog("alert");
    pageDialog("confirm");

    ipcMain.on("get-dialog-data-from-webcontents", (event, windowID) => {
        const contentsID = event.sender.id;

        let window = windowManager.allWindows.find(
            (x: IWindow) => x.window.id == windowID
        );
        let dialog = window.tabs.allDialogs.find(
            (x: IDialog) => x.view.webContents.id == contentsID
        );

        let tab = window.tabs.tabs.find((x: Tab) => x.id === dialog.tabID);
        event.returnValue = {
            windowID: window.id,
            tabID: tab.id,
        };
    });

    // TODO: rework this
    ipcMain.on("time-dialog-resize", (event, winID, rect) => {
        let win = windowManager.getWindow(winID);
        win.timeDialog.setBounds({
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
        });
    });

    ipcMain.on("omnibox-resize", (event, winID, tabID, rect) => {
        let win = windowManager.getWindow(winID);
        win.tabs.getOmniboxView(tabID).setBounds({
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
        });
    });

    ipcMain.on("upate-webcontent-rect", (event, winID, tabID, rect) => {
        let win = windowManager.getWindow(winID);
        let view = win.tabs.getTabView(tabID);

        view.setBounds({
            x: Math.round(rect.x),
            y: Math.round(rect.y) - 1,
            width: Math.round(rect.width),
            height: Math.round(rect.height) + 1,
        });
    });
}
