
import {html, css, LitElement} from 'lit';
import { Tab } from "../tabs";

export class TabComponent extends LitElement {
  static styles = css`
    :host {
        z-index: 2;
        width: 100%;
        height: 100%;
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
customElements.define('browser-layout', TabComponent);
