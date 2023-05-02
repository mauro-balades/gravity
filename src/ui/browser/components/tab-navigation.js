import {html, css, LitElement} from 'lit';
import { TabManager } from '../tabs';

export class TabNavigation extends LitElement {
  static styles = css`
    #tab-navigation {
        width: -webkit-fill-available;
        display: flex;
        align-items: end;
        justify-content: start;

        background-color: rgba(0,0,0,.05);
        height: 40px;
        padding: 10px 10px 0 10px;

        position: relative;

        border-bottom: 1px solid rgba(0,0,0,.1);
        box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
    }

    :host browser-layout:not(.active) {
        display: none;
    }
  `;

  static properties = {
    tabManager: {type: TabManager},
  };

  constructor() {
    super();
  }

  removeTab(e, id) {
    e.preventDefault();
    this.tabManager.removeTab(id);
    this.update();
  }

  changeTab(e, id) {
    e.preventDefault();
    if (this.tabManager.getCurrentTab().id == id) {return;}
    this.tabManager.changeTab(id);
    this.update();
  }

  render() {
    return html`
    <div id="tab-navigation">
        ${this.tabManager.tabs.map((tab) => html`
            <tab-component
                @auxclick=${(e) => (e.button == 1) && this.removeTab(e, tab.id)}
                @click=${(e) => this.changeTab(e, tab.id)}
                .onRemove=${(e) => this.removeTab(e, tab.id)}
                class="${tab.isActive ? 'active' : ''}"
                .tab=${tab} />
        `)}
    </div>
    <div id="rest-of-browser">
        ${this.tabManager.tabs.map((tab) => html`
            <browser-layout class="${tab.isActive ? 'active' : ''}" .tab=${this.tabManager.getCurrentTab()}></browser-layout>
        `)}
    </div>
    `;
  }
}
customElements.define('tab-navigation', TabNavigation);