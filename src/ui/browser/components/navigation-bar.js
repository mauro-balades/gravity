
import {html, css, LitElement} from 'lit';
import { Tab } from "../tabs";

export class NavigationBar extends LitElement {
  static styles = css`
    :host {
        width: -webkit-fill-available;
        height: 40px;
        border-bottom: 1px solid rgba(0,0,0,.1);

        display: flex;
        padding: 0 10px;
    }
  `;

  static properties = {
    tab: {type: Tab},
  };

  constructor() {
    super();
    this.tab = null;
  }

  render() {
    return html`

    `;
  }
}
customElements.define('navigation-bar', NavigationBar);

