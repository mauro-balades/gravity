import { html, css, LitElement } from "lit";

export class DialogContainer extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            transform: translateX(-50%);
        }

        span {
            width: -webkit-fill-available;
            height: -webkit-fill-available;
            display: flex;
        }
    `;

    static properties = {
        resize: {},
        type: {},
    };

    constructor() {
        super();
        this.resize = () => {};
        this.type = "<bug>";

        setTimeout(() => 
        {let elem = this.shadowRoot.querySelector("span");new ResizeObserver((entries) => {
            for (let entry of entries) {
                this.resize(entry);
            }
        }).observe(elem);
        window.electronAPI.addCustomHandle(`${this.type}-open`, () => {
            this.resize({target:elem});
        })
    }, 50);

    }

    render() {
        return html`<span></span>`;
    }
}
customElements.define("dialog-container", DialogContainer);
