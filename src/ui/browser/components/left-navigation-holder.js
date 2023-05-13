import {html, css, LitElement} from 'lit';

export class LeftNavigationIcons extends LitElement {
  static styles = css`
    :host {
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        display: flex;
        flex-flow: column;

        padding: 10px 0;
        margin-top: 10px;

        justify-content: center;

        width: -webkit-fill-available;
        height: -webkit-fill-available;

        border-radius: 6px;
        border: 1px solid rgba(0,0,0,.1);
    }

    :host::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: var(--gr-glass-opacity);
        z-index: -1;

        border-radius: 6px;
        background: var(--gr-primary-background);
    }

    svg {
        width: 15px;
        height: 15px;

        transition: .01s;
        border-radius: 5px;
        padding: 7px;
        cursor: pointer;

        border: 1px solid transparent;
    }

    svg:hover {
        background: rgba(calc(var(--gr-is-dark) * 255),calc(var(--gr-is-dark) * 255),calc(var(--gr-is-dark) * 255),.05);
        border-color: rgba(calc(var(--gr-is-dark) * 255),calc(var(--gr-is-dark) * 255),calc(var(--gr-is-dark) * 255),.1);
    }

    svg:active {
        width: 13px;
        height: 13px;

        padding: 8px;
    }

    :host > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    :host > div:fist-of-type {
        height: -webkit-fill-available;
    }

    :host > div:last-of-type {
        margin: auto 0 0 0;
    }
  `;

  static properties = {
  };

  constructor() {
    super();
  }

  render() {
    return html`
        <div>
            <span title="Bookmarks">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
            </span>
            <span title="Downloads">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </span>
            <span title="Website History">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
            <span title="Notes">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </span>
            <span title="Add more widgets">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
        </div>
        <div>
            <svg title="Open settings" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
    `;
  }
}
customElements.define('left-navigation-holder', LeftNavigationIcons);