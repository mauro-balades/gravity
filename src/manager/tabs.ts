import { BrowserView, Event } from "electron";

export class Tab {
    public isActive = false;
    public URL = '';
    public title = '';
    public icon = '';
    public favicon = '';
    public id = -1;

    private updater: any;

    constructor(URL: string, view: BrowserView) {
        this.URL = URL;

        // view.webContents.on('update-target-url', this.onUpdateTargetUrl.bind(this)) // when hovering
        view.webContents.on('page-title-updated', this.onPageTitleUpdated.bind(this))
        view.webContents.on('page-favicon-updated', this.onPageFaviconUpdated.bind(this))
    }

    public setUpdater(updater: any) {
        this.updater = updater;
    }

    // private onUpdateTargetUrl(e: Event, url: string) {
    //     this.URL = url;
    //     this.updater();
    // }

    private onPageTitleUpdated(e: Event, title: string) {
        this.title = title;
        this.updater();
    }

    private onPageFaviconUpdated(e: Event, favicon: string) {
        this.favicon = favicon;
        this.updater();
    }
}

export class TabManager {
    tabs: Tab[] = [];
    browserViews: BrowserView[] = [];
    latestId: number = 0;

    constructor() {}

    addTab(tab: Tab, view: BrowserView) {
        tab.id = ++this.latestId;
        this.tabs.push(tab);
        this.browserViews.push(view);

        return this.latestId;
    }

    getTab(id: number) {
        return this.tabs.find((x) => x.id == id);
    }

    removeTab(id: number) {
        let i = this.tabs.findIndex((x: Tab) => x.id == id);
        this.tabs.splice(i, 1);
        this.browserViews.splice(i, 1);
    }

    changeTab(id: number) {
        for (const tab of this.tabs) {
            tab.isActive = tab.id == id;
        }
    }

    getTabView(id: number) {
        let i = this.tabs.findIndex((x: Tab) => x.id == id);
        return this.browserViews[i];
    }

    getCurrentTab() {
        return this.tabs.find(x => x.isActive);
    }
}
