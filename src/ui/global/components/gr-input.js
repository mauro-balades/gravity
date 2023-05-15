import { LitElement, html, css } from "lit";

export class GravityTextInput extends LitElement {
    static properties = {
        placeHolder: {},
        text: {},
        onchange: {},
    };

    static styles = css`
        :host {
            position: relative;
        }

        :host > input {
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: var(--gr-input-radius);

            font-weight: 500;
            font-size: 81.25%;

            color: var(--gr-primary-color);

            width: -webkit-fill-available;
            white-space: nowrap;
            text-overflow: ellipsis;

            overflow: hidden;
            padding: 8px;

            position: relative;
            transition: 0.1s;

            border: 0;
            outline: 0;
        }

        .border-bottom {
            content: "";
            bottom: 0;
            left: 50%;

            position: absolute;
            transition: all 5s;
            background-color: var(--gr-button-background);

            transform: translate(-50%, -50%);

            height: 2px;

            transform: translate(-50%, -50%);
            border-radius: 2px;
        }

        input:focus + .border-bottom {
            width: 100%;
        }

        .subtext {
            font-size: 10px;
            font-weight: 500;

            padding: 0 5px;

            opacity: 0.7;
        }
    `;

    constructor() {
        super();

        this.placeHolder = "";
        this.text = "";
        this.onchange = () => {};
    }

    render() {
        return html`
            ${this.text !== ""
                ? html` <p class="subtext">${this.text}</p> `
                : ""}
            <input
                @input="${this.onchange}"
                type="text"
                placeholder="${this.placeHolder}"
            />
            <div class="border-bottom"></div>
        `;
    }
}

customElements.define("gr-text-input", GravityTextInput);
