import { html, css, LitElement } from "lit";

export class AlertDialog extends LitElement {
    static styles = css`
        :host {
            height: -webkit-fill-available;
            width: -webkit-fill-available;
            display: flex;

            overflow: hidden;
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
                dialog="alert-dialog-content"
            ></core-browser-dialog>
        `;
    }
}
customElements.define("alert-dialog", AlertDialog);
