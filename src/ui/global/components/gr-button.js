import { LitElement, html, css } from "lit";

export class GravityButton extends LitElement {
    static properties = {
        disabled: {},
        secondary: {},
        btn_style: {},
        autofocus: {},
        invisible: {},
        min_width: {},
        disable_invert: {},
    };

    static styles = css`
        :host > button {
            background-color: var(--gr-button-background);
            border-radius: var(--gr-button-radius);

            font-weight: 500;
            font-size: 81.25%;

            width: fit-content;
            
            height: 35px;
            
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
            font-weight: 600;
        }

        button:focus {
            border-color: var(--gr-primary-color);
            outline: var(--gr-primary-background);
        }

        button > div {
            display: flex;
            align-items: center;
        }

        button.primary > div {
            filter: invert(1);
        }

        button.non-invert > div,
        button.invisible > div {
            filter: invert(0);
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

        :host > button.invisible {
            background: transparent;
            border: 1px solid transparent;
            outline: none;
            color: var(--gr-primary-color);
            font-weight: 600;
            font-size: 12px;
        }

        :host > button.invisible:hover {
            background: rgba(
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                0.05
            );
            border-color: rgba(
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                0.1
            );
        }
    `;

    constructor() {
        super();

        this.disabled = false;
        this.btn_style = "";
        this.secondary = false;
        this.autofocus = false;
        this.invisible = false;
        this.min_width = 100;
        this.disable_invert = false;
    }

    render() {
        return html`
            <button
                style="min-width: ${this.min_width}px; ${this.btn_style}"
                class="${this.disabled == "true" ? "disabled" : ""} ${this
                    .secondary == "true"
                    ? "secondary"
                    : "primary"} ${this.invisible ? "invisible" : ""} ${this.disable_invert ? "non-invert" : ""}"
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
