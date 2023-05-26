import { html, css, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export class CoreBrowserDialog extends LitElement {
    static styles = css`
        :host {
            height: -webkit-fill-available;
            width: -webkit-fill-available;
            display: flex;

            animation: flipInX .5s forwards;
            padding: 5px;
        }

        @keyframes flipInX {
            0% {
               transform: perspective(400px) rotateX(90deg); 
               opacity: 0;
            }
            40% {
               transform: perspective(400px) rotateX(-10deg);
            }
            70% {
               transform: perspective(400px) rotateX(10deg);
            }
            100% {
               transform: perspective(400px) rotateX(0deg);
               opacity: 1;
            }
        }
    `;

    static properties = {
        dialog: { type: String },
    };

    constructor() {
        super();

        let user = window.electronAPI.getCurrentUser();
        defineUserTheme(user.theme);

        this.dialog = "div";
        window.electronAPI.addUpdateHandle(this.updateDialog.bind(this));
    }

    updateDialog() {
        let user = window.electronAPI.getCurrentUser();
        defineUserTheme(user.theme);

        this.requestUpdate();
        super.performUpdate();
    }

    render() {
        let tag = `<${this.dialog}></${this.dialog}>`;
        return html`${unsafeHTML(tag)}`;
    }
}
customElements.define("core-browser-dialog", CoreBrowserDialog);
