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
    window.electronAPI.addUpdateHandle(this.updateBrowser.bind(this));
  }

  updateBrowser() {
    this.tabs = window.electronAPI.getTabs()

    this.requestUpdate();
    super.performUpdate();
  }

  render() {
    return html`<tab-navigation updateTabs=${this.updateTabs} .tabs=${this.tabs}></tab-navigation>`;
  }
}
customElements.define('core-browser-view', CoreBrowserView);