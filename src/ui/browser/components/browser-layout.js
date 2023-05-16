import { html, css, LitElement } from "lit";

export class BrowserLayout extends LitElement {
    static styles = css`
        :host {
            width: 100%;
            margin: 0px 20px 10px 0px;

            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);

            border: 1px solid
                rgba(
                    calc(var(--gr-is-light) * 255),
                    calc(var(--gr-is-light) * 255),
                    calc(var(--gr-is-light) * 255),
                    0.1
                );
            border-bottom: 0;

            border-radius: 10px;
            overflow: hidden;
            position: relative;

            display: flex;
            flex-direction: column;
        }
    `;

    static properties = {
        tab: {},
        hasListener: {},
    };

    constructor() {
        super();
        this.tab = null;

        this.hasListener = false;
    }

    updateTabInfo(tab) {
        this.tab = tab;

        this.requestUpdate();
        super.performUpdate();
    }

    render() {
        if (!this.hasListener) {
            this.hasListener = true;
            window.electronAPI.addTabListener(
                this.tab.id,
                this.updateTabInfo.bind(this)
            );
        }

        return html`
            <navigation-bar .tab=${this.tab}></navigation-bar>
            <web-contents .tab=${this.tab}></web-contents>
            <utility-bar></utility-bar>
        `;
    }

    updateRect() {
        let { x, y, width, height } = this.renderRoot
            .querySelector("web-contents")
            .getBoundingClientRect();
        window.electronAPI.setTabBoundaries(this.tab.id, {
            x,
            y,
            width,
            height,
        });
    }

    firstUpdated() {
        new ResizeObserver((entries) => {
            for (let entry of entries) {
                this.updateRect();
            }
        }).observe(this.shadowRoot.querySelector("web-contents"));
    }
}
customElements.define("browser-layout", BrowserLayout);
