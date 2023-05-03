
import {html, css, LitElement} from 'lit';
import { Tab } from "../tabs";

export class BrowserLayout extends LitElement {
  static styles = css`
    :host {
        width: 100%;
        height: -webkit-fill-available;
        margin: 0 20px 80px 0;

        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        border: 1px solid rgba(0,0,0,.1);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.15);

        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }

    :host::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      opacity: .5;
      z-index: -1;
      background: var(--gr-primary-background);
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
      <navigation-bar .tab=${this.tab}></navigation-bar>
      <web-contents></web-contents>
    `;
  }
}
customElements.define('browser-layout', BrowserLayout);
