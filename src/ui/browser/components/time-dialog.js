import { html, css, LitElement } from "lit";

export class TimeDialog extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            bottom: calc(100% + 5px);
            left: 0;
            width: 200px;
            height: 250px;
        }
    `;

    static properties = {};

    render() {
        return html``;
    }
}
customElements.define("time-dialog", TimeDialog);
