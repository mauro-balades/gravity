
import {html, css, LitElement} from 'lit';
import { Tab } from "../tabs";

export class URLHandler extends LitElement {
  static styles = css`
    :host {
        display: flex;
        align-items: center;

        font-size: 13px;
        margin-left: 2px;
    }

    #url-display, #url-display > b, #url-display > span {
        display: flex;
        align-items: center;
    }

    :host, #url-input, #url-display {
        width: -webkit-fill-available;
        height: -webkit-fill-available;

        background: transparent;
        outline: none;
        border: none;

        font-weight: 500;
    }

    #url-input {
        display: none;
        user-select: text;
    }

    #url-display {
        display: flex;
    }

    #url-display > span {
        opacity: .8;
    }
  `;

  static properties = {
    tab: {type: Tab},
    focused: {},
  };

  constructor() {
    super();
    this.tab = null;
    this.focused = false;
  }

  activateFocus(e) {
    this.shadowRoot.querySelector("#url-display").style.display = "none";
    let input = this.shadowRoot.querySelector("#url-input");

    input.style.display = "block";

    getSelection().removeAllRanges();

    input.focus();
    input.select();

    this.update(this.focused, true);
  }

  render() {
    return html`
        <div id="url-display" @mousedown=${this.activateFocus}>${this.getURLElements()}</div>
        <input id="url-input" type="text" value="${this.tab.URL}" placeholder="Search or type URL" />
    `;
  }

  getURLElements() {
    let parsed = new URL(this.tab.URL);
    if (parsed.protocol == 'gravity:' || parsed.protocol == 'view-source:') {
        return html`
            <span>${parsed.protocol}//</span>
            <b>${parsed.pathname.substring(2, parsed.pathname.length)}</b>
        `
    }

    return html`
        <span>${parsed.protocol}//</span>
        <b>${parsed.host}</b>
        <span>${parsed.pathname}</span>
    `
  }
}
customElements.define('url-handler', URLHandler);

