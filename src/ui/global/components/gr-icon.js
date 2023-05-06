import {LitElement, html, css} from 'lit';

export class GravityTextInput extends LitElement {
  static properties = {
    className: {},
  };

  constructor() {
    super();

    this.className = '';
  }

  render() {
    return html`
        <i class="fas ${this.className}"></i>
    `;
  }
}

customElements.define('gr-icon', GravityTextInput);

