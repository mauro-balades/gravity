
import {html, css, LitElement} from 'lit';

export class AddTabButton extends LitElement {
  static styles = css`

    :host {
        display: flex;
        height: -webkit-fill-available;
        align-items: center;
    }

    .wrapper {
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: .1s;

        position: relative;

        box-shadow: rgb(0 0 0 / 5%) 0px 1px 2px 0px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);

        width: 25px;
        height: 25px;

        border-radius: 6px;
        margin: auto 0;
        margin-left: 5px;
    }

    svg {
        transition-delay: .5s;
        transition: .5s;

        position: relative;

        background-color: transparent;
        cursor: pointer;
        user-select: none;

        display: block;

        opacity: 0;
        transform: scale(0.8);

        animation: .5s tab-start forwards;
    }

    .wrapper:hover svg {
        transform: scale(0.9);
    }

    .wrapper:hover {
        transform: translateY(-1px);
    }

    .wrapper::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .5;
      z-index: -1;
      background: var(--gr-primary-background);
      border-radius: 6px;
    }

    @keyframes tab-start {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  static properties = {
    addTab: {}
  };

  constructor() {
    super();
    this.addTab = () => {};
  }

  render() {
    return html`
        <div @click=${this.addTab} class="wrapper">
            <svg fill="none" stroke="currentColor" stroke-width="3" width="13" height="13" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>
        </div>
    `;
  }
}
customElements.define('add-tab-button', AddTabButton);
