import querystring from 'querystring';
import {html, css, LitElement} from 'lit';

let query = querystring.parse(global.location.search);
let winID = JSON.parse(query['?winID'])

window.electronAPI.setWindowID(winID);

export class CoreBrowserView extends LitElement {
  static properties = {
    tabs: {type: TabManager},
  };

  constructor() {
    super();
    this.tabs = new TabManager();

    let user = window.electronAPI.getCurrentUser();
    defineUserTheme(user.theme);

    if (this.tabs.tabs.length == 0) {
        let newTab = new Tab("gravity://new-tab");
        newTab.isActive = true;
        this.tabs.addTab(newTab)
    }
  }

  render() {
    return html`<tab-navigation .tabManager=${this.tabs}></tab-navigation>`;
  }
}
customElements.define('core-browser-view', CoreBrowserView);