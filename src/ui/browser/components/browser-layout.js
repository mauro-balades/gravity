
import {html, css, LitElement} from 'lit';

export class BrowserLayout extends LitElement {
  static styles = css`
    :host {
        width: 100%;
        margin: 0px 20px 0px 0px;

        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        border: 1px solid rgba(0,0,0,.1);
        border-bottom: 0;

        border-radius: 10px;
        overflow: hidden;
        position: relative;

        display: flex;
        flex-direction: column;
    }

    :host::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      opacity: .5;
      z-index: -1;
      background: var(--gr-primary-background);
    }
  `;

  static properties = {
    tab: {},
  };

  constructor() {
    super();
    this.tab = null;

    window.addEventListener("resize", this.updateRect.bind(this));
  }

  render() {
    return html`
      <navigation-bar .tab=${this.tab}></navigation-bar>
      <web-contents .tab=${this.tab}></web-contents>
    `;
  }

  updateRect() {
    let { x,y,width,height } = this.renderRoot.querySelector("web-contents").getBoundingClientRect();
    window.electronAPI.setTabBoundaries(
      this.tab.id,
      { x,y,width,height }
    );
  }

  firstUpdated() {
    this.updateRect();
  }
}
customElements.define('browser-layout', BrowserLayout);
