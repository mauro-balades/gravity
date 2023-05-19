import { BrowserWindow, ContextMenuParams, Event, Menu, WebContents } from "electron";
import setLinksMenu from "./link";
import setDevMenu from "./dev";

export default function setContextMenu(contents: WebContents, winID: number) {
    contents.on('context-menu', async (e: Event, props: ContextMenuParams) => {
        var targetWindow = BrowserWindow.getFocusedWindow()
        if (!targetWindow) { return }

        let items: any[] = [];
        if (props.linkURL) { setLinksMenu(items, contents, e, props, winID); }

        setDevMenu(items, contents, e, props, winID);
        Menu.buildFromTemplate(items).popup({ window: targetWindow });
    })
}
