import {app, BrowserWindow, ipcMain} from 'electron';
import { createNewUser } from '../storage';
import { createBrowserWindow } from '../windows/browser';
import { windowManager } from "../manager/window";
import { logger } from '../logger';

export default function () {
    ipcMain.on('create-new-user', async (event, username) => {
        logger.i("Creaing new user called " + username);
        let user = await createNewUser(username);
        logger.v("Closing window used for profile setup");
        BrowserWindow.getFocusedWindow().close() // We assume it's the user creation modal
        logger.v("Opening browser window with new profile created...");
        createBrowserWindow(user);
    })

    ipcMain.on('get-current-user', (event, winID) => {
        let win = windowManager.getWindow(winID);
        let user = win.user;

        event.returnValue = user;
    });
}
