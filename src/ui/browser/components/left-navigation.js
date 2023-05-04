import {html, css, LitElement} from 'lit';

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
  };

  constructor() {
    super();
  }

  render() {
    return html`
        <div class="icons">
        </div>
    `;
  }
}
customElements.define('left-navigation', LeftNavigation);