
import {html, css, LitElement} from 'lit';

export class LocationInput extends LitElement {
  static styles = css`
  :host {
    width: -webkit-fill-available;
    height: -webkit-fill-available;

    margin: 5px;

    border-radius: 5px;
    background-color: rgba(0,0,0,.08);
    padding: 2pxx;

    display: flex;
    align-items: center;
  }

  certificate-info:hover {
    background: rgba(0,0,0,.1);
  }
  `;

  static properties = {
    tab: {},
  };

  constructor() {
    super();
    this.tab = null;
  }

  render() {
    return html`
        <certificate-info .tab=${this.tab}></certificate-info>
        <url-handler .tab=${this.tab}></url-handler>
    `;
  }
}
customElements.define('location-input', LocationInput);

