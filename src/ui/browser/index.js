import {html, css, LitElement} from 'lit';

export class CoreBrowserView extends LitElement {
  static styles = css`
    :host {
      height: -webkit-fill-available;
      width: 100%;
    }
  `

  static properties = {
    tabs: {},
  };

  constructor() {
    super();

    let user = window.electronAPI.getCurrentUser();
    defineUserTheme(user.theme);

    this.tabs = window.electronAPI.getTabs();

    if (this.tabs.length == 0) {
        let newTab = window.electronAPI.createTab("https://google.com", true);
        this.tabs.push(newTab);
    }
  }

  render() {
    return html`<tab-navigation .tabs=${this.tabs}></tab-navigation>`;
  }
}
customElements.define('core-browser-view', CoreBrowserView);