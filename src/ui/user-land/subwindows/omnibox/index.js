import { html, css, LitElement } from "lit";

export class LocationInput extends LitElement {
    static styles = css`
        :host {
            width: -webkit-fill-available;
            height: -webkit-fill-available;

            margin: 5px;

            border-radius: 5px;

            background-color: rgba(
                calc(var(--gr-is-light) * 255),
                calc(var(--gr-is-light) * 255),
                calc(var(--gr-is-light) * 255),
                0.6
            );
            border: 1px solid
                rgba(
                    calc(var(--gr-is-light) * 255),
                    calc(var(--gr-is-light) * 255),
                    calc(var(--gr-is-light) * 255),
                    0.3
                );

            display: flex;
            align-items: center;
        }

        :host(*:focus) {
            border: 2px solid var(--gr-button-background);
        }

        certificate-info:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    `;

    static properties = {
        tab: {},
    };

    constructor() {
        super();

        let user = window.electronAPI.getCurrentUser();
        defineUserTheme(user.theme);

        this.tab = window.electronAPI.getTab(window.$tabID);
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
            <certificate-info .tab=${this.tab}></certificate-info>
            <url-handler .tab=${this.tab}></url-handler>
        `;
    }
}
customElements.define("location-input", LocationInput);
