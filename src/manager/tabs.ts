import {
    BrowserView,
    BrowserWindow,
    Event,
    WebContents,
    webContents,
} from "electron";
import { normalizeObject, omitKeys } from "../utils";
import { DialogType, IDialog } from "../interfaces";

export class Tab {
    public isActive: boolean = false;
    public URL: string = "";
    public title: string = "";
    public icon: string = "";
    public favicon: string = "";
    public id: number = -1;

    public canGoBack: boolean = false;
    public canGoForward: boolean = false;

    public isLoading: boolean = false;

    private updater: any;
    private view: WebContents;

    constructor(URL: string, view: BrowserView) {
        this.URL = URL;

        // view.webContents.on('update-target-url', this.onUpdateTargetUrl.bind(this)) // when hovering
        view.webContents.on(
            "page-title-updated",
            this.onPageTitleUpdated.bind(this)
        );
        view.webContents.on(
            "page-favicon-updated",
            this.onPageFaviconUpdated.bind(this)
        );

        view.webContents.on(
            "did-start-loading",
            this.onPageStartLoading.bind(this)
        );
        view.webContents.on(
            "did-stop-loading",
            this.onPageStopLoading.bind(this)
        );

        view.webContents.on(
            "did-start-navigation",
            (e, href, isInPlace, isMainFrame) => {
                if (isMainFrame) this.onWillNavigate(e, href);
            }
        );
        view.webContents.on("will-navigate", this.onWillNavigate.bind(this));

        this.view = view.webContents;
    }

    public setUpdater(updater: any) {
        this.updater = updater;
    }

    private URLUpdated() {
        this.canGoBack = this.view.canGoBack();
        this.canGoForward = this.view.canGoForward();

        this.updater();
    }

    // private onUpdateTargetUrl(e: Event, url: string) {
    //     this.URL = url;
    //     this.updater();
    // }

    private onPageStartLoading(e: Event) {
        this.isLoading = true;
        this.updater();
    }

    private onPageStopLoading(e: Event) {
        this.isLoading = false;
        this.updater();
    }

    private onWillNavigate(e: Event, url: string) {
        this.URL = url;
        this.URLUpdated();
    }

    private onPageTitleUpdated(e: Event, title: string) {
        this.title = title;
        this.updater();
    }

    private onPageFaviconUpdated(e: Event, favicons: string[]) {
        this.favicon = favicons[0];
        this.updater();
    }

    asObject() {
        return normalizeObject(omitKeys(this, ["view", "updater"]));
    }
}

export class TabManager {
    tabs: Tab[] = [];
    browserViews: BrowserView[] = [];
    omniboxViews: BrowserView[] = [];

    dialogs: IDialog[] = [];

    latestId: number = 0;
    topWindow: BrowserWindow;

    constructor(topWindow: BrowserWindow) {
        this.topWindow = topWindow;
    }

    addTab(tab: Tab, views: { view: BrowserView; omnibox: BrowserView }) {
        tab.id = ++this.latestId;
        this.tabs.push(tab);
        this.browserViews.push(views.view);
        this.omniboxViews.push(views.omnibox);

        return this.latestId;
    }

    getTab(id: number) {
        return this.tabs.find((x) => x.id == id);
    }

    public get allDialogs() {
        return this.dialogs;
    }

    removeTab(id: number) {
        let i = this.tabs.findIndex((x: Tab) => x.id == id);
        this.tabs.splice(i, 1);
        this.browserViews.splice(i, 1);
    }

    changeTab(id: number) {
        for (let i = 0; i < this.tabs.length; i++) {
            let isActive = this.tabs[i].id == id;
            this.tabs[i].isActive = isActive;

            if (isActive) {
                this.topWindow.addBrowserView(this.browserViews[i]);
            } else {
                this.topWindow.removeBrowserView(this.browserViews[i]);
            }
        }
    }

    getAllDialogs(tabId: number): IDialog[] {
        return this.dialogs.filter((x: IDialog) => x.tabID == tabId);
    }

    getDialogWithType(tabId: number, dialogType: DialogType) {
        return this.dialogs.find(
            (x) => x.tabID == tabId && x.type == dialogType
        );
    }

    addNewDialog(dialog: IDialog) {
        this.dialogs.push(dialog);
    }

    getTabView(id: number) {
        let i = this.tabs.findIndex((x: Tab) => x.id == id);
        return this.browserViews[i];
    }

    getCurrentTab() {
        return this.tabs.find((x) => x.isActive);
    }

    getOmniboxView(tabID: number) {
        let i = this.tabs.findIndex((x: Tab) => x.id == tabID);
        return this.omniboxViews[i];
    }
}
