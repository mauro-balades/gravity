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
            border: 1px solid rgba(255, 255, 255, 0.3);

            border-top: none;
            border-bottom: none;
        }
    `;

    static properties = {
        tab: {},
    };

    constructor() {
        super();
        this.tab = null;
    }

    render() {
        return html``;
    }
}
customElements.define("web-contents", WebContentsElement);
