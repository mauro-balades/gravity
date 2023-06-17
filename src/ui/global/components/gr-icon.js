import { LitElement, html, css } from "lit";

export class GravityTextInput extends LitElement {
    static properties = {
        className: {},
        numElements: {},
        scale: {},
        icon_style: {},
    };

    static styles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative:
  }
  `;

    constructor() {
        super();

        this.className = "";
        this.numElements = 0;
        this.icon_style = "";
        this.scale = 0.3;
    }

    render() {
        if (parseInt(this.numElements) == 0) {
            return html`
                <link
                    rel="stylesheet"
                    href="gravity://assets/css/fa-all.min.css"
                    type="text/css"
                />
                <i style="${this.icon_style}" class="${this.className}"></i>
            `;
        } else {
            return html`
                <style>
                    :host {
                        transform: scale(${parseFloat(this.scale)});
                    }
                </style>
                <link
                    rel="stylesheet"
                    href="gravity://assets/css/fa-all.min.css"
                    type="text/css"
                />
                <div
                    style="position: absolute; ${this.icon_style}"
                    class="${this.className}"
                >
                    ${Array.from(Array(parseInt(this.numElements)).keys()).map(
                        (_) => html`<div></div>`
                    )}
                </div>
            `;
        }
    }
}

customElements.define("gr-icon", GravityTextInput);
