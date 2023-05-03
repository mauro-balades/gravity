import {html, css, LitElement} from 'lit';
import { TabManager } from '../tabs';

export class TabNavigation extends LitElement {
  static styles = css`
    #tab-navigation {
        width: -webkit-fill-available;
        display: flex;
        align-items: end;
        justify-content: start;
        height: 40px;
        padding: 10px;
        padding-left: 0;

        position: relative;
    }

    :host browser-layout:not(.active) {
        display: none;
    }

    :host .view-container {
      display: flex;
      align-items: start;
    }

    :host #rest-of-browser {
      width: 100%;
      height: -webkit-fill-available;
      position: relative;

      display: flex;
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
    <div class="view-container">
      <left-navigation></left-navigation>
      <div style="width:100%;height:100vh;">
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
      </div>
    </div>
    `;
  }
}
customElements.define('tab-navigation', TabNavigation);