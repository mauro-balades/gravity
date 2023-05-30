import { html, css, LitElement } from "lit";

export class AlertDialogContent extends LitElement {
    static styles = css`
        :host {
            height: -webkit-fill-available;
            width: -webkit-fill-available;

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            border-radius: var(--gr-dialog-radius);

            background: var(--gr-primary-background);

            box-shadow: rgb(0 0 0 / 5%) 0px 1px 2px 0px;
            backdrop-filter: blur(20px);
            overflow: hidden;

            position: relative;
            z-index: 2;
        }

        :host::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: var(--gr-primary-background);
        }

        h3, p {
            margin: 2px 20px;
        }

        h3 {
            font-size: 17px;
            margin-top: 20px;
        }

        p {
            font-size: 13px;
            opacity: .7;
        }

        h3, gr-button {
            user-select: none;
        }                                                    

        .buttons {
            width: -webkit-fill-available;

            display: flex;
            flex-direction: column;

            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);

            background: var(--gr-primary-background);

            padding: 10px;
            margin-top: 10px;
        }

        .buttons::before {
            --brightness-dark: 0.80;
            --brightness-light: 0.95;
            
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: calc(var(--gr-glass-opacity) + 0.4);
            z-index: -1;
            
            backdrop-filter: brightness(calc(var(--gr-is-light) * var(--brightness-light) + (1 - var(--gr-is-light)) * var(--brightness-dark)));
        }                                                       

        gr-button {
            margin-left: auto;
        }
    `;

    static properties = {
        data: { state: true },
        dialog: { state: true },
    };

    constructor() {
        super();
        this.dialog = window.electronAPI.createDialogInstance("alert");

        this.data = { title: "This page says", message: "" };
        this.dialog.sendLoaded().then(data => {
            this.data = data;

            super.requestUpdate();
            this.requestUpdate();
        });
    }

    accept(e) {
        this.dialog.send("result", true);
    }

    render() {
        return html`
            <h3>${this.data.title} says:</h3>
            <p>${this.data.message}</p>
            <div class="buttons">
                <gr-button @click=${this.accept} secondary=${true} autofocus="1">Accept</gr-button>
            </div>
        `;
    }
}
customElements.define("alert-dialog-content", AlertDialogContent);
