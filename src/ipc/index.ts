import {app, BrowserWindow, ipcMain} from 'electron';

export default function () {
    ipcMain.on('create-new-user', (event, title) => {
        console.log("create new user")
    })
}
