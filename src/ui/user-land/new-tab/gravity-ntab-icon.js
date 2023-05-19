import { html, css, LitElement } from "lit";

export class NTabIcon extends LitElement {
    static styles = css`
        :host {
            margin: 20px auto;
        }

        img {
            height: 50px;
            width: 50px;

            backdrop-filter: invert(100%);
        }
    `;

    static properties = {};

    constructor() {
        super();

        let user = window.electronAPI.getCurrentUser();
        defineUserTheme(user.theme);
    }

    render() {
        return html`
            <img src="gravity://assets/images/icon.svg />
        `;
    }
}
customElements.define("gravity-ntab-icon", NTabIcon);