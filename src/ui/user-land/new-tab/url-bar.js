
import { html, css, LitElement } from "lit";

export class URLBar extends LitElement {
    static styles = css`
    :host {
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        display: flex;
        flex-flow: column;
    
        padding: 10px 0;
        margin-top: 10px;
    
        justify-content: center;
    
        width: 50%;
        height: 30px;

        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    :host::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: var(--gr-glass-opacity);
        z-index: -1;
    
        border-radius: 6px;
        background: var(--gr-primary-background);
    }
    `;

    static properties = {};

    constructor() {
        super();
    }

    render() {
        return html`
            Hello there
        `;
    }
}
customElements.define("url-bar", URLBar);