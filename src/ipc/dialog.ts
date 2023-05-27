import { Rectangle, ipcMain } from "electron";
import { IDialog, IWindow } from "../interfaces";

export const showDialog = (
    window: IWindow,
    dialog: IDialog,
    data: any
): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!dialog) return;

        window.window.webContents.send(`${dialog.type}-open`);

        if (!dialog.initialized) {
            dialog.handle("loaded", async (e: any) => {
                return data;
            });
    
            dialog.on("result", (e, result) => {
                console.log(result);
                resolve(result);
                // TODO:

                dialog.rearrange();
                window.window.removeBrowserView(dialog.view);
            });
    
            dialog.on("resize", (event, rect: Rectangle) => {
                let bounds = {
                    x: Math.round(rect.x),
                    y: Math.round(rect.y),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                };
    
                dialog.rearrange(bounds);
            });

            dialog.initialized = true;
        }

        window.window.addBrowserView(dialog.view);
        
        dialog.view.webContents.focus();
        dialog.view.webContents.loadURL(dialog.url);
    });
};
