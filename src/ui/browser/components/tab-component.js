
import {html, css, LitElement} from 'lit';
import { Tab } from "../tabs";

export class TabComponent extends LitElement {
  static styles = css`
    :host {
        min-width: 200px;

        background-color: transparent;
        padding: 2.5px 15px;
        cursor: pointer;

        height: -webkit-fill-available;
        border-radius: 6px;

        font-size: 13px;
        font-weight: 500;

        display: flex;
        align-items: center;

        user-select: none;
        border-right: 1px solid rgba(0,0,0,.05);

        margin-right: 10px;
    }

    :host(.active) {
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        background-color: var(--gr-primary-background);
        border: 1px solid rgba(0,0,0,.1);
    }

    :host > svg:last-of-type {
        border-radius: 10px;
        transition: .1;
        cursor: pointer;
        padding: 3px;
    }

    :host > svg:last-of-type:hover {
        background: rgba(0,0,0,.05);
    }

    :host .tab-title {
        width: -webkit-fill-available;
        overflow: hidden;

        space-wrap: nowrap;
        text-overflow: ellipsis;
    }
  `;

  static properties = {
    tab: {type: Tab},
    onRemove: {}
  };

  constructor() {
    super();
    this.tab = null;
  }

  render() {
    return html`
        <div class="tab-title">
            ${this.tab.URL}
        </div>
        <svg @click=${this.onRemove} width="15" height="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `;
  }
}
customElements.define('tab-component', TabComponent);
