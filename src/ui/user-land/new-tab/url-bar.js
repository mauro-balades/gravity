
import { html, css, LitElement } from "lit";

export class URLBar extends LitElement {
    static styles = css`
    :host {
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        display: flex;
        align-items: center;

        padding: 10px 0;
        margin-top: 10px;

        width: 50%;
        height: 30px;

        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.1);

        cursor: pointer;
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

    svg {
        margin: 0 20px;
    }
    `;

    static properties = {};

    constructor() {
        super();
        this.addEventListener("click", () => {
            window.electronAPI.sendCustomEvent("omnibox:activate-focus");
        });
    }

    render() {
        return html`
            <div>
                <svg fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                </svg>
            </div>
            <div>
                Search or insert a website address
            </div>
        `;
    }
}
customElements.define("url-bar", URLBar);