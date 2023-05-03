
import {html, css, LitElement} from 'lit';
import { Tab } from "../tabs";

export class LocationInput extends LitElement {
  static styles = css`
  :host {
    width: -webkit-fill-available;
    height: -webkit-fill-available;

    margin: 5px;

    border-radius: 5px;
    background-color: rgba(0,0,0,.08);
    padding: 2px 10px;

    display: flex;
    align-items: center;
  }

  certificate-info:hover {
    background: rgba(0,0,0,.1);
  }

  .separator {
    height: 80%;
    width: 1.5px;
    border-radius: 2px;
    background: rgba(0,0,0,.4);
    margin: 0 5px;
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
        <certificate-info .tab=${this.tab}></certificate-info>
        <span class="separator"></span>
        <url-handler .tab=${this.tab}></url-handler>
    `;
  }
}
customElements.define('location-input', LocationInput);

