import { Rectangle, ipcMain } from "electron";
import { IDialog, IWindow } from "../interfaces";

export const showDialog = (window: IWindow, dialog: IDialog, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!dialog) return;

        window.window.webContents.send(`${dialog.type}-open`);

        dialog.on("loaded", (e: any) => {
          console.log("LOADED")
          e.reply("data", data);
        });

        dialog.on("result", (e, result) => {
            console.log(result)
            resolve(result);
            // TODO:

            dialog.rearrange();
            // dialog.hide();
        });

        dialog.on("resize", (event, rect: Rectangle) => {
          let bounds = {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };

          dialog.rearrange(bounds);
        })

        window.window.addBrowserView(dialog.view);
        dialog.view.webContents.reload();
    });
};
