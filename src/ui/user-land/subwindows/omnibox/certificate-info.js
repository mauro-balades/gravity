import { html, css, LitElement } from "lit";

export class CertificateInfo extends LitElement {
    static styles = css`
        :host {
            width: 30px;
            height: 20px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 2px;
            cursor: pointer;

            transition: 0.1s;
            padding: 2.5px;
            margin-right: 5px;
        }

        :host svg {
            width: 70%;
            height: 70%;
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
        return html`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
            </svg>
        `;
    }
}
customElements.define("certificate-info", CertificateInfo);
