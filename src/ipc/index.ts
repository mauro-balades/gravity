import {app, BrowserView, BrowserWindow, ipcMain} from 'electron';
import { createNewUser } from '../storage';
import { createBrowserWindow } from '../windows/browser';
import { windowManager } from "../manager/window";
import { logger } from '../logger';
import { Tab } from '../manager/tabs';
import path = require('path');
import { normalizeObject } from '../utils';

export default function () {
    ipcMain.on('create-new-user', async (event, username) => {
        logger.i("Creaing new user called " + username);
        let user = await createNewUser(username);
        logger.v("Opening browser window with new profile created...");
        createBrowserWindow(user);

        setTimeout(
            () => {
                logger.v("Closing window used for profile setup");
                BrowserWindow.getFocusedWindow().close() // We assume it's the user creation modal
            },
            process.platform == "linux" ? 1000 : 0
            // Electron has a bug on linux where it
            // won't initialize properly when using
            // transparency. To work around that, it
            // is necessary to delay the window
            // spawn function.
        );
    })

    ipcMain.on('get-current-user', (event, winID) => {
        let win = windowManager.getWindow(winID);
        let user = win.user;

        event.returnValue = user;
    });

    ipcMain.on('create-new-tab', (event, winID, url, active) => {
        logger.i("Creating new tab with URL: " + url);
        let win = windowManager.getWindow(winID);

        const view = new BrowserView({
            webPreferences: {
                nodeIntegrationInSubFrames: true,
                contextIsolation: true,
                webviewTag: false,
                sandbox: true,
                defaultEncoding: 'utf-8',
                nodeIntegration: false,
                scrollBounce: true,
                navigateOnDragDrop: true,
                safeDialogs: true,
            }
        });

        win.window.addBrowserView(view);
        view.setBackgroundColor('#fff')
        view.webContents.loadURL(url);

        let t = new Tab(url, view);
        t.setUpdater(() => {
            win.window.webContents.send(`update-tab-info-${win.id}-${t.id}`, normalizeObject(t));
        });

        t.isActive = active;
        win.tabs.addTab(t, view);

        event.returnValue = normalizeObject(t);
    });

    ipcMain.on('get-all-tabs', (event, winID) => {
        let win = windowManager.getWindow(winID);
        event.returnValue = win.tabs.tabs.map((x: Tab) => normalizeObject(x));
    });

    ipcMain.on('upate-webcontent-rect', (event, winID, tabID, rect) => {
        let win = windowManager.getWindow(winID);
        let view = win.tabs.getTabView(tabID);

        view.setBounds({
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
        });
    });
}
