import { html, css, LitElement } from "lit";

export class TabNavigation extends LitElement {
    static styles = css`
        #tab-navigation {
            width: -webkit-fill-available;
            display: flex;
            align-items: end;
            justify-content: start;
            height: 40px;
            padding: 10px;
            padding-left: 0;

            position: relative;
        }

        :host {
            display: flex;
            flex-flow: column;
            height: 100%;
        }

        :host browser-layout:not(.active) {
            display: none;
        }

        :host .view-container {
            display: flex;
            align-items: start;

            height: 100%;
        }

        :host #rest-of-browser {
            width: 100%;
            height: -webkit-fill-available;
            position: relative;

            display: flex;
        }
    `;

    static properties = {
        tabs: {},
    };

    constructor() {
        super();
        this.tabs = [];
    }

    removeTab(e, id) {
        e.preventDefault();
        throw Error("TODO");
        this.update();
    }

    changeTab(e, id) {
        e.preventDefault();
        window.electronAPI.setActiveTab(id);
    }

    newTab() {
        window.electronAPI.createTab(undefined, true);
    }

    render() {
        return html`
            <div class="view-container">
                <left-navigation></left-navigation>
                <div
                    style="width:100%;height:-webkit-fill-available;display: flex;flex-flow: column;"
                >
                    <div id="tab-navigation">
                        ${this.tabs.map(
                            (tab) => html`
                                <tab-component
                                    @auxclick=${(e) =>
                                        e.button == 1 &&
                                        this.removeTab(e, tab.id)}
                                    @click=${(e) => this.changeTab(e, tab.id)}
                                    .onRemove=${(e) =>
                                        this.removeTab(e, tab.id)}
                                    class="${tab.isActive ? "active" : ""}"
                                    .tab=${tab}
                                />
                            `
                        )}
                        <add-tab-button .addTab=${this.newTab}></add-tab-button>
                    </div>
                    <div id="rest-of-browser">
                        ${this.tabs.map(
                            (tab) => html`
                                <browser-layout
                                    class="${tab.isActive ? "active" : ""}"
                                    .tab=${tab}
                                ></browser-layout>
                            `
                        )}
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define("tab-navigation", TabNavigation);
