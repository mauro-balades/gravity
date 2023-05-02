
export class Tab {
    isActive = false;
    URL = '';
    title = '';
    icon = '';

    id = -1;

    constructor(URL) {
        this.URL = URL;
    }
}

export class TabManager {
    tabs = [];
    latestId = 0;

    constructor() {}

    addTab(tab) {
        tab.id = ++this.latestId;
        this.tabs.push(tab);

        return this.latestId;
    }

    getTab(id) {
        return this.tabs.find((x) => x.id == id).tab;
    }

    removeTab(id) {
        let i = this.tabs.indexOf(x => x.id == id);
        this.tabs.splice(i, 1);
    }

    changeTab(id) {
        for (const tab of this.tabs) {
            tab.isActive = tab.id == id;
        }
    }

    getCurrentTab() {
        return this.tabs.find(x => x.isActive);
    }
}

window.Tab = Tab;
window.TabManager = TabManager;
