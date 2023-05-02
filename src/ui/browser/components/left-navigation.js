import {html, css, LitElement} from 'lit';
import { TabManager } from '../tabs';

export class LeftNavigation extends LitElement {
  static styles = css`

    :host {
      min-width: 50px;
      display: flex;
      align-items: start;

      height: 100vh;
      max-width: 300px;
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
        <div class="icons">
        </div>
    `;
  }
}
customElements.define('left-navigation', LeftNavigation);