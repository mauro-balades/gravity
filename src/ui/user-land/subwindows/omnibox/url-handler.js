import { html, css, LitElement } from "lit";

export class URLHandler extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;

            font-size: 13px;
        }

        #url-display,
        #url-display > b,
        #url-display > span {
            display: flex;
            align-items: center;
        }

        :host,
        #url-input,
        #url-display {
            width: -webkit-fill-available;
            height: -webkit-fill-available;

            background: transparent;
            outline: none;
            border: none;

            font-weight: 500;
        }

        #url-input {
            display: none;
            user-select: text;

            color: var(--gr-primary-color);
        }

        #url-display {
            display: flex;
            cursor: text;
        }

        #url-display > span {
            opacity: 0.8;
        }
    `;

    static properties = {
        tab: {},
        focused: {},
    };

    constructor() {
        super();
        this.tab = null;
        this.focused = false;

        window.electronAPI.addCustomHandle("omnibox:activate-focus", () =>
            this.activateFocus(undefined));
    }

    activateFocus(e) {
        let input = this.shadowRoot.querySelector("#url-input");
        this.shadowRoot.querySelector("#url-display").style.display = "none";

        input.style.display = "block";

        setTimeout(() => {
            input.focus();
            input.select();
        }, 50);

        this.update({ focused: true });
        super.requestUpdate();
    }

    render() {
        return html`
            <div id="url-display" @mousedown=${this.activateFocus}>
                ${this.getURLElements()}
            </div>
            <input
                id="url-input"
                type="text"
                value="${this.tab.URL.startsWith("gravity://new-tab") ? "" : this.tab.URL}"
                placeholder="Search or insert a website address"
            />
        `;
    }

    getURLElements() {
        try {
            let parsed = new URL(this.tab.URL);

            if (this.tab.URL.startsWith("gravity://new-tab")) {
                return html`
                    <span>Gravity  ꞏ  New tab</span>
                `
            }

            if (
                parsed.protocol == "gravity" ||
                parsed.protocol == "view-source"
            ) {
                return html`
                    <span>${parsed.protocol}//</span>
                    <b
                        >${parsed.pathname.substring(
                            2,
                            parsed.pathname.length
                        )}</b
                    >
                `;
            }

            return html`
                <span>${parsed.protocol}//</span>
                <b>${parsed.host}</b>
                <span>${parsed.pathname}</span>
            `;
        } catch (_) {
            return html` <span>${this.tab.URL}</span> `;
        }
    }
}
customElements.define("url-handler", URLHandler);
