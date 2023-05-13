
import {html, css, LitElement} from 'lit';

export class TabComponent extends LitElement {
  static styles = css`
    :host {
        width: 100%;
        max-width: 200px;

        transition-delay: .5s;
        transition: .5s;

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

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    :host(.active) {
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        border: 1px solid rgba(0,0,0,.1);

        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
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
        white-space: nowrap;
    }

    :host(.active)::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: var(--gr-glass-opacity);
      z-index: -1;
      background: var(--gr-primary-background);
      border-radius: 6px;
    }

    .page-favicon {
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-right: 10px;
    }

    .page-favicon img {
      width: 20px;
      height: 20px;

      border-radius: 3px;
    }

    .page-favicon gr-icon {
      opacity: .3;
      margin: 0 10px;
    }

    .page-favicon {
      font-size: 17px;
      opacity: 0;
      transform: scale(0.8);

      animation: .5s page-favicon-start forwards;
    }

    @keyframes page-favicon-start {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  static properties = {
    tab: {},
    onRemove: {},
    hasListener: {state: true},
  };

  constructor() {
    super();
    this.tab = null;
    this.hasListener = false;
  }

  updateTabInfo(e, tab) {
    this.tab = tab;
    this.requestUpdate();
    super.performUpdate();
  }

  render() {
    if (!this.hasListener) {
      this.hasListener = true;
      window.electronAPI.addTabListener(this.tab.id, this.updateTabInfo.bind(this));
    }

    return html`
        <div class="page-favicon">
          ${this.tab.isLoading ?
            html`<gr-icon className="lds-ring" scale=${0.3} numElements=${4}></gr-icon>`
            : html`
              <img src="${this.tab.favicon}" />
            `}
        </div>
        <div class="tab-title">
            ${this.tab.title}
        </div>
        <svg @click=${this.onRemove} width="15" height="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `;
  }
}
customElements.define('tab-component', TabComponent);
