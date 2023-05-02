import {app, BrowserWindow, ipcMain} from 'electron';
import { createNewUser } from '../storage';
import { createBrowserWindow } from '../windows/browser';

export default function () {
    ipcMain.on('create-new-user', async (event, username) => {
        let user = await createNewUser(username);
        BrowserWindow.getFocusedWindow().close() // We assume it's the user creation modal
        createBrowserWindow(user);
    })
}
