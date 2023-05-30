import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export class GravityButton extends LitElement {
    static properties = {
        text: {},
        disabled: {},
        secondary: {},
        style: {},
        autofocus: {},
    };

    static styles = css`
        :host > button {
            background-color: var(--gr-button-background);
            border-radius: var(--gr-button-radius);

            font-weight: 500;
            font-size: 81.25%;

            width: fit-content;
            min-width: 100px;
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;

            color: var(--gr-secondary-color);
            outline-width: 0;

            white-space: nowrap;
            text-overflow: ellipsis;

            overflow: hidden;
            padding: 8px 16px;

            position: relative;
            user-select: none;

            border: 2px solid transparent;
            outline: 1px solid transparent;

            transition: 0.1s;
        }

        button:focus {
            border-color: var(--gr-primary-color);
            outline: var(--gr-primary-background);
        }

        button.primary > div {
            filter: invert(1);
        }

        :host gr-icon {
            font-size: 14px;
            height: 15px;
        }

        :host > button:hover {
            opacity: 0.8;
            box-shadow: var(--active-shadow-action),
                0 1px 2px 0 var(--gr-button-background), 0.3,
                0 3px 6px 2px var(--gr-button-background), 0.15;
        }

        :host > button.disabled {
            background-color: rgba(0, 0, 0, 0.3);
            cursor: not-allowed;
        }

        :host > button.secondary {
            background-color: transparent;
            color: var(--gr-button-background);
            border: 2px solid var(--gr-button-background);
        }
    `;

    constructor() {
        super();

        this.disabled = false;
        this.style = "";
        this.text = "";
        this.secondary = false;
        this.autofocus = false;
    }

    render() {
        return html`
            <button
                style="${this.style}"
                class="${this.disabled == "true" ? "disabled" : ""} ${this
                    .secondary == "true"
                    ? "secondary"
                    : "primary"}"
                ${this.autofocus ? "autofocus" : ""}
            >
                <div>
                    <slot></slot>
                </div>
            </button>
        `;
    }
}

customElements.define("gr-button", GravityButton);
