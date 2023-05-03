
import {html, css, LitElement} from 'lit';
import { Tab } from "../tabs";

export class CertificateInfo extends LitElement {
  static styles = css`
  :host {
    width: 15px;
    height: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    cursor: pointer;

    transition: .1s;
    padding: 2.5px;
  }

  :host svg {
    width: 90%;
    height: 90%;
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    `;
  }
}
customElements.define('certificate-info', CertificateInfo);

