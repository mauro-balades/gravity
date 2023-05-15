import { html, css, LitElement } from "lit";

export class NavigationBar extends LitElement {
    static styles = css`
        :host {
            width: -webkit-fill-available;
            height: 40px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            display: flex;
            align-items: center;
            padding: 0 10px;

            position: relative;
        }

        :host .icon-button {
            border-radius: 10px;
            transition: 0.1;
            cursor: pointer;
            padding: 5px;

            height: 15px;
            width: 15px;
            min-width: 15px;

            margin: 0 5px;

            display: flex;
            position: relative;

            align-items: center;
            justify-content: center;
        }

        :host > .icon-button:hover {
            background: rgba(
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                calc(var(--gr-is-dark) * 255),
                0.16
            );
        }

        :host .icon-button > svg {
            width: 100%;
        }
    `;

    static properties = {
        tab: {},
    };

    constructor() {
        super();
        this.tab = null;

        setTimeout(
            () =>
                new ResizeObserver((entries) => {
                    for (let entry of entries) {
                        const { x, y, width, height } =
                            entry.target.getBoundingClientRect();
                        window.electronAPI.omniboxResize(this.tab.id, {
                            width,
                            height,
                            x,
                            y,
                        });
                    }
                }).observe(this.shadowRoot.querySelector("#location-input")),
            50
        );
    }

    render() {
        return html`
            <div class="icon-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </div>
            <div class="icon-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </div>
            <div class="icon-button" @click=${(!this.tab.isLoading) ? () => {
              window.electronAPI.reloadTab(this.tab.id)
            } : () => {}}>
                ${this.tab.isLoading ? html`
                  <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ` : html`
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                  >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                      />
                  </svg>
                `}
            </div>
            <location-input id="location-input"></location-input>
        `;
    }
}
customElements.define("navigation-bar", NavigationBar);
