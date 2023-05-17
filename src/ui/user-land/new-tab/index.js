import { html, css, LitElement } from "lit";

export class NewTab extends LitElement {
    static styles = css`
        :host {
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    `;

    static properties = {};

    constructor() {
        super();

        let user = window.electronAPI.getCurrentUser();
        console.log(user)
        defineUserTheme(user.theme);
    }

    render() {
        return html`
            <url-bar></url-bar>
        `;
    }
}
customElements.define("new-tab", NewTab);