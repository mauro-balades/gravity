import { app, protocol, BrowserWindow } from "electron";
import * as path from "path";
import setup from "./setup";
import * as gravityProtocol from "./protocols/gravity";
import ipcStart from "./ipc";

app.setName("Gravity");
app.commandLine.appendSwitch("enable-transparent-visuals");

// configure the protocols
protocol.registerSchemesAsPrivileged([
    {
        scheme: "gravity",
        privileges: {
            standard: true,
            secure: true,
            allowServiceWorkers: true,
            supportFetchAPI: true,
            corsEnabled: true,
        },
    },
]);

// enable the sandbox
app.enableSandbox();

// HACK fix for cors in custom protocols
// see https://github.com/electron/electron/issues/20730
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

// enable process reuse to speed up navigations
// see https://github.com/electron/electron/issues/18397
(app as any).allowRendererProcessReuse = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    gravityProtocol.register(protocol);
    setup();

    ipcStart();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        // if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
