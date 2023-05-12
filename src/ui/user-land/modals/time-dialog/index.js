
import {html, css, LitElement} from 'lit';

export class TimeDialog extends LitElement {
  static styles = css`
    :host {
        width: 100%;
        height: 100%;

        transition-delay: .5s;
        transition: .5s;

        background-color: transparent;
        padding: 2.5px 15px;

        border-radius: 6px;

        font-size: 13px;
        font-weight: 500;

        display: flex;
        flex-flow: column;

        user-select: none;

        margin-right: 10px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        border: 1px solid rgba(0,0,0,.1);

        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        animation: puff-in-center .2s ease;
    }

    :host::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .7;
      z-index: -1;
      background: var(--gr-primary-background);
      border-radius: 6px;
    }

    @keyframes puff-in-center {
      0% {
        -webkit-transform: scale(2);
                transform: scale(2);
        -webkit-filter: blur(4px);
                filter: blur(4px);
        opacity: 0;
      }
      100% {
        -webkit-transform: scale(1);
                transform: scale(1);
        -webkit-filter: blur(0px);
                filter: blur(0px);
        opacity: 1;
      }
    }
  `;

  static properties = {
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <clock-header></clock-header>
      <analog-clock></analog-clock>
      <div style="padding: 20px;">
        TODO: TIMER / CRONO. <br />TABS HERE!
      </div>
    `;
  }
}
customElements.define('time-dialog', TimeDialog);
