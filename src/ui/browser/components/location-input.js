
import {html, css, LitElement} from 'lit';

export class LocationInput extends LitElement {
  static styles = css`
  :host {
    width: -webkit-fill-available;
    height: -webkit-fill-available;

    margin: 5px;

    border-radius: 5px;

    background-color: rgba(calc(var(--gr-is-light) * 255),calc(var(--gr-is-light) * 255),calc(var(--gr-is-light) * 255),0.6);
    border: 1px solid rgba(calc(var(--gr-is-light) * 255),calc(var(--gr-is-light) * 255),calc(var(--gr-is-light) * 255),.3);

    display: flex;
    align-items: center;
  }

  :host(*:focus) {
    border: 2px solid var(--gr-button-background);
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

