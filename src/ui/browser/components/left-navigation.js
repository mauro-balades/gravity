import {html, css, LitElement} from 'lit';

export class LeftNavigation extends LitElement {
  static styles = css`

    :host {
      min-width: 50px;
      display: flex;
      align-items: start;

      height: -webkit-fill-available;
      max-width: 300px;

      display: flex;
      flex-flow: column;

      padding: 7px;
      padding-top: 0;
    }

    .gravity-icon {
        height: 40px;
        padding: 5px 0;

        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  `;

  static properties = {
  };

  constructor() {
    super();
  }

  render() {
    return html`
        <div class="gravity-icon">

        </div>
        <left-navigation-holder></left-navigation-holder>
    `;
  }
}
customElements.define('left-navigation', LeftNavigation);