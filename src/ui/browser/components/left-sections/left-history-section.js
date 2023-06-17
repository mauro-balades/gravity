import { html, css, LitElement } from "lit";

export class LeftHistorySection extends LitElement {
    static styles = css`

        :host {
            display: flex;
            flex-direction: column;

            position: relative;
            height: 100%;
        }

        .history-item {
            display: flex;
            margin: 15px 0;
            padding: 5px;
            border-radius: 5px;

            align-items: center;
            overflow: hidden;
        }

        .favicon {
            width: 20px;
            height: 20px;

            border-radius: 2px;
            margin-right: 10px;
        }

        .item-url {
            opacity: .7;
            font-size: 11px;
            font-weight: 600;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .item-title {
            font-size: 14px;
            font-weight: 600;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .controls {
            display: flex;
            border-top: 1px solid rgba(
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                0.1
            );

            margin-top: 10px;
            align-self: flex-end;

            width: -webkit-fill-available;
            padding: 15px 2px;
            padding-bottom: 0;

            display: flex;
            align-items: center;
            justify-content: space-between;

            font-size: 12px;
            margin-top: auto;
        }

        .history {
            overflow-x: auto;
            margin-bottom: 5px;
        }

        .history-item-data {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    `;

    constructor() {
        super();
    }

    render() {
        let history = window.electronAPI.getHistoryItems();
        return html`
            <h4 style="margin: 10px 0;">Browsing History</h4>
            <div class="history">
                ${history.map(x => html`
                    <div class="history-item">
                        <img src="${x.favicon}" class="favicon" />
                        <div title="${x.title}" class="history-item-data">
                            <div class="item-title">
                                ${x.title}
                            </div>
                            <div class="item-url">
                                ${x.url}
                            </div>
                        </div>
                    </div>
                `)}
            </div>
            <div class="controls"> 
                <gr-button min_width=${10} btn_style="padding: 10px;" invisible=${true}>
                    <gr-icon className="fa fa-cog"></gr-icon>
                </gr-button>
                <gr-button invisible=${true}>
                    Open history page
                    <gr-icon icon_style="margin-left: 12px;" className="fa fa-external-link-alt"></gr-icon>
                </gr-button>
            </div>
        `;
    }
}
customElements.define("left-history-section", LeftHistorySection);
