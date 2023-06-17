import { LitElement, html, css } from "lit";
import { unsafeStatic } from "lit/static-html.js";
import introSvg from "./intro-svg";
import profileSvg from "./profile-svg";

export class SetupUser extends LitElement {
    static properties = {
        sectionIndex: {},
        username: { state: true },
        creating: { state: true },
    };

    static styles = css`
        :host {
            width: 800px;
            height: 600px;

            position: relative;
            overflow: hidden;
        }

        section.fade-out {
            animation: puff-out-center 0.1s
                cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards !important;
        }

        #intro {
            display: flex;
            align-items: center;
            justify-content: center;

            flex-direction: column;
            overflow: hidden;

            animation: puff-in-center 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
                both;
        }

        section {
            animation: puff-in-center 0.1s ease-in forwards 0.1s;
            position: absolute;

            top: 0;
            left: 0;

            width: 800px;
            height: 600px;

            overflow: hidden;
            opacity: 0;
        }

        .intro-background {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .intro-background {
            width: 100%;
            height: 100%;
        }

        .intro-background svg {
            width: 100%;
            height: 100%;
        }

        #intro h1,
        #intro p {
            text-align: center;
            max-width: 70%;
            font-weight: 500;
        }

        #intro h1 {
            margin: 0;
            font-weight: 600;
        }

        #intro p {
            opacity: 0.6;
        }

        #intro gr-button {
            margin: 0 auto;
        }

        #creation gr-button {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }

        #creation > img {
            position: absolute;
            top: 233px;
            left: 50%;
            transform: translate(-50%, -50%);

            width: 100px;
            height: 100;

            border-radius: 50%;
            border: 5px solid rgba(255, 255, 255, 0.8);
        }

        #creation .input {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;
        }

        #creation gr-text-input {
            width: 300px;
            margin: 80px auto 0 auto;
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

        @keyframes puff-out-center {
            0% {
                -webkit-transform: scale(1);
                transform: scale(1);
                -webkit-filter: blur(0px);
                filter: blur(0px);
                opacity: 1;
            }
            100% {
                -webkit-transform: scale(2);
                transform: scale(2);
                -webkit-filter: blur(4px);
                filter: blur(4px);
                opacity: 0;
            }
        }

        #creation #profile-bg-svg {
            color: rgba(0, 0, 0, 0.1);
            transition: 0.1s;
        }

        #creation:has(gr-button[disabled="false"]) #profile-bg-svg {
            color: var(--gr-button-background);
            opacity: < 0.8;
        }
    `;

    constructor() {
        super();
        this.sectionIndex = 0;
        this.username = "";
        this.creating = false;
    }

    createSection(index, sectionData, content) {
        return this.sectionIndex == index + 1 || this.sectionIndex == index
            ? html`
                  <section
                      id=${sectionData}
                      class="${this.sectionIndex - 1 == index
                          ? "fade-out"
                          : ""}"
                  >
                      ${content}
                  </section>
              `
            : "";
    }

    updateUsername(e) {
        this.username = e.target.value;
        super.performUpdate();
    }

    createUser() {
        this.creating = true;
        super.performUpdate();

        this.incrementIndex();
    }

    render() {
        return html`
            ${this.createSection(
                0,
                "intro",
                html`
                    <div class="intro-background">${introSvg}</div>
                    <h1>Be whoever you want to be!</h1>
                    <p>
                        Create a new profile and step into a new identity!
                        Whether you're a secret agent or a cat lover, our secure
                        browser lets you browse the web with a fresh new
                        perspective.
                    </p>
                    <gr-button
                        disabled=${!this.canGoNext()}
                        @click=${this.incrementIndex}
                    >Create new profile</gr-button>
                `
            )}
            ${this.createSection(
                1,
                "creation",
                html`
                    <div class="intro-background">${profileSvg}</div>
                    <img src="gravity://assets/pfps/avatar-default.png" />
                    <div class="input">
                        <gr-text-input
                            .onchange=${(e) => this.updateUsername(e)}
                            text="Profile username (min 2, max 6)"
                        />
                    </div>
                    <!-- TODO: add loading icon -->
                    <gr-button
                        style="${this.creating ? `font-size: 20px;` : ""}"
                        disabled="${!this.canGoNext()}"
                        @click=${this.createUser}
                    >${this.creating
                        ? html`<gr-icon className="lds-ellipsis" numElements=${4}></gr-icon>`
                        : this.canGoNext()
                        ? "Oh yeah!"
                        : "fill all the data!"}</gr-button>
                `
            )}
        `;
    }

    canGoNext() {
        if (this.sectionIndex == 0) {
            return true;
        } else if (this.sectionIndex == 1) {
            return (
                this.username !== "" &&
                this.username.length > 2 &&
                this.username.length < 7
            );
        }
    }

    incrementIndex() {
        if (this.canGoNext()) {
            if (this.sectionIndex == 1) {
                window.electronAPI.createNewUser(this.username);
            } else {
                this.sectionIndex++;
            }
        }
    }
}

customElements.define("setup-user", SetupUser);
