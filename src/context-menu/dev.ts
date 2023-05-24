import { ContextMenuParams, Event, WebContents, ipcMain } from "electron";

export default (
    items: any[],
    contents: WebContents,
    e: Event,
    props: ContextMenuParams,
    winID: number
) => {
    items.push({ type: "separator" });
    items.push({
        type: "submenu",
        label: "Development tools",
        submenu: [
            {
                label: "Validate webpage",
                click: (_: any) => {
                    let url = `https://validator.w3.org/check?uri=${encodeURI(
                        contents.getURL()
                    )}`;
                    ipcMain.emit(
                        "create-new-tab",
                        /* event = */ {},
                        winID,
                        url,
                        true
                    );
                },
            },
            {
                label: "View page source",
                click: (_: any) => {
                    let url = `view-source:${encodeURI(contents.getURL())}`;
                    ipcMain.emit(
                        "create-new-tab",
                        /* event = */ {},
                        winID,
                        url,
                        true
                    );
                },
            },
            {
                label: "Inspect Element",
                click: (_: any) => {
                    contents.openDevTools({ mode: "detach" });
                    contents.inspectElement(props.x, props.y);
                    if (contents.isDevToolsOpened()) {
                        contents.devToolsWebContents.focus();
                    }
                },
            },
        ],
    });
};
