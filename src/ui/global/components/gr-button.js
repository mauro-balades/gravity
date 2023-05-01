import {LitElement, html, css} from 'lit';

export class GravityButton extends LitElement {
  static properties = {
    text: {},
    disabled: {},
    secondary: {},
  };

  static styles = css`
:host > div {
  background-color: var(--gr-primary-background);
  border-radius: var(--gr-button-radius);

  font-weight: 500;
  font-size: 81.25%;

  width: fit-content;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--gr-secondary-color);

  min-width: 5.14em;
  outline-width: 0;

  white-space: nowrap;
  text-overflow: ellipsis;

  overflow: hidden;
  padding: 8px 16px;

  position: relative;
  user-select: none;

  border: 2px solid;
  transition: .1s;
}

:host > div:hover {
  opacity: .8;
  box-shadow: var(--active-shadow-action), 0 1px 2px 0 var(--gr-primary-background), .3, 0 3px 6px 2px var(--gr-primary-background), .15;
}

:host > div.disabled {
  background-color: rgba(0,0,0,.3);
  cursor: not-allowed;
}

:host > div.secondary {
    background-color: transparent;
    color: var(--gr-primary-background);
    border: 2px solid var(--gr-primary-background);
}
  `;

  constructor() {
    super();

    this.disabled = false;
    this.text = '';
    this.secondary = false;
  }

  render() {
    return html`
      <div class="${(this.disabled == 'true') ? 'disabled' : ''} ${this.secondary == 'true' ? 'secondary' : ''}">${this.text}</div>
    `;
  }
}

customElements.define('gr-button', GravityButton);

