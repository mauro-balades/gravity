import {app, BrowserWindow, ipcMain} from 'electron';
import { createNewUser } from '../storage';
import { createBrowserWindow } from '../windows/browser';
import { windowManager } from "../manager/window";
import { logger } from '../logger';

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
}
