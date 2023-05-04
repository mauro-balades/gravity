
import {html, css, LitElement} from 'lit';

export class WebContentsElement extends LitElement {
  static styles = css`
    :host {
        width: -webkit-fill-available;
        height: 100%;

        display: block;
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
    return html``;
  }
}
customElements.define('web-contents', WebContentsElement);
