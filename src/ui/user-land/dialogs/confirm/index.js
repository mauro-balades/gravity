import { html, css, LitElement } from "lit";

export class ConfirmDialog extends LitElement {
    static styles = css`
        :host {
            height: -webkit-fill-available;
            width: -webkit-fill-available;
            display: flex;
        }
    `;

    static properties = {
        tabs: {},
    };

    constructor() {
        super();
    }

    render() {
        return html`
            <core-browser-dialog
                dialog="confirm-dialog-content"
            ></core-browser-dialog>
        `;
    }
}
customElements.define("confirm-dialog", ConfirmDialog);
