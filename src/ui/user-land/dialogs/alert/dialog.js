import { html, css, LitElement } from "lit";

export class AlertDialogContent extends LitElement {
    static styles = css`
        :host {
            height: -webkit-fill-available;
            width: -webkit-fill-available;

            display: flex;
            flex-direction: column;

            border-radius: var(--gr-dialog-radius);
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
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
            background: var(--gr-primary-background);
            border-radius: var(--gr-dialog-radius);
        }
    `;

    static properties = {
        data: { state: true },
        dialog: { state: true }
    };

    constructor() {
        super();
        this.dialog = window.electronAPI.createDialogInstance('alert');
    
        this.dialog.on("data", (data) => {
            this.data = data;
            super.requestUpdate();
            this.requestUpdate();
        });

        // setTimeout(() => {
        //     this.dialog.send("result", true);
        // }, 1000);

        this.dialog.sendLoaded();
    }

    render() {
        return html`
            HELLO
        `;
    }
}
customElements.define("alert-dialog-content", AlertDialogContent);
