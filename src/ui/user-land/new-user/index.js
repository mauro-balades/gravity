import {LitElement, html, css, unsafeHTML} from 'lit';
import introSvg from "./intro-svg";

export class SetupUser extends LitElement {
  static properties = {
    sectionIndex: {},
  };

  static styles = css`
    :host {
      width: 100%;
      height: 100%;

      position: relative;
      overflow: hidden;
    }

    #intro {
      width: 100%;
      height: 100%;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-direction: column;
      overflow: hidden;
    }

    #intro-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    #intro-background {
      width: 100%;
      height: 100%;
    }

    #intro-background svg {
      width: 100%;
      height: 100%;
    }

    #intro h1, #intro p {
      text-align: center;
      max-width: 70%;
      font-weight: 500;
    }

    #intro h1 {
      margin: 0;
      font-weight: 600;
    }

    #intro p {
      opacity: .6;
    }

    #intro gr-button {
      margin: 0 auto;
    }
  `;

  constructor() {
    super();
    this.sectionIndex = 0;
  }

  render() {
    return html`
      <section id="intro">
        <div id="intro-background">
          ${introSvg}
        </div>
        <h1>Be whoever you want to be!</h1>
        <p>Create a new profile and step into a new identity! Whether you're a secret agent or a cat lover, our secure browser lets you browse the web with a fresh new perspective.</p>
        <gr-button text="Create new profile" @disabled=${this.canGoNext()} @click=${this.incrementIndex}></gr-button>
      </section>
    `;
  }

  canGoNext() {
    if (this.tabIndex == 0) {
      return true;
    }
  }

  incrementIndex() {
    this.sectionIndex++;
  }
}

customElements.define('setup-user', SetupUser);

