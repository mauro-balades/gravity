import { html, css, LitElement } from "lit";

export class WebContentsElement extends LitElement {
    static styles = css`
        :host {
            width: -webkit-fill-available;
            height: 100%;

            display: block;

            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);

            position: relative;
        }
    `;

    static properties = {
        tab: {},
    };

    constructor() {
        super();
        this.tab = null;

        this.alertPrompt = this.resizePromptWrapper("alert");
        this.confirmPrompt = this.resizePromptWrapper("confirm");
    }

    resizePromptWrapper(type) {
        return (entry) => {
            const { x, y, width, height } =
                entry.target.getBoundingClientRect();
            window.electronAPI.sendToDialog("resize", type, this.tab.id, {
                width,
                height,
                x,
                y,
            });
        };
    }

    render() {
        return html`
            <dialog-container
                style="width: 400px; height: 150px; left: 50%; top: -10px;"
                type="alert"
                .resize=${(e) => this.alertPrompt(e)}
            ></dialog-container>
            <dialog-container
                style="width: 400px; height: 150px; left: 50%; top: -10px;"
                type="confirm"
                .resize=${(e) => this.confirmPrompt(e)}
            ></dialog-container>
        `;
    }
}
customElements.define("web-contents", WebContentsElement);
