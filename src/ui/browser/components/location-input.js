import { html, css, LitElement } from "lit";

export class LocationInput extends LitElement {
    static styles = css`
        :host {
            width: -webkit-fill-available;
            height: -webkit-fill-available;

            margin: 5px;
            border-radius: 5px;
        }
    `;

    static properties = {};

    constructor() {
        super();
    }

    render() {
        return html``;
    }
}
customElements.define("location-input", LocationInput);
