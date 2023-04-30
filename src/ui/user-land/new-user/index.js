import {LitElement, html, css} from 'lit';

export class SetupUser extends LitElement {
  static properties = {
    sectionIndex: {},
  };

  static styles = css`
    :host {
      width: 80%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-direction: column;
      margin: 0 auto !important;
    }
  `;

  constructor() {
    super();
    this.sectionIndex = 0;
  }

  render() {
    return html`
      <gr-button text="Create new profile" @disabled=${this.canGoNext()} @click=${this.incrementIndex}></gr-button>
    `;
  }

  canGoNext() {
    if (this.tabIndex == 0) {
      return true;
    }
  }

  incrementIndex() {
    this.sectionIndex++;
  }
}

customElements.define('setup-user', SetupUser);

