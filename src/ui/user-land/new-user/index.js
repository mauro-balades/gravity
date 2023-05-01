import {LitElement, html, css} from 'lit';
import {unsafeStatic} from 'lit/static-html.js';
import introSvg from "./intro-svg";
import profileSvg from './profile-svg';

export class SetupUser extends LitElement {
  static properties = {
    sectionIndex: {},
  };

  static styles = css`
    :host {
      width: 800px;
      height: 600px;

      position: relative;
      overflow: hidden;
    }

    section.fade-out {
      animation: puff-out-center 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) forwards !important;
    }

    #intro {
      display: flex;
      align-items: center;
      justify-content: center;

      flex-direction: column;
      overflow: hidden;

      animation: puff-in-center 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
    }

    section {
      animation: puff-in-center 0.2s ease-in forwards 0.2s;
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

    #creation gr-button {
      position: absolute;
      bottom: 20px;
      right: 20px;
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
  `;

  constructor() {
    super();
    this.sectionIndex = 0;
  }

  createSection(index, sectionData, content) {
    console.log(this.sectionIndex)
    return (this.sectionIndex == (index+1) || this.sectionIndex == index) ? html`
      <section id=${sectionData} class="${((this.sectionIndex-1) == index) ? "fade-out" : ''}">
        ${content}
      </section>
    ` : '';
  }

  canGoNext() {
    return false;
  }

  render() {
    return html`
        ${this.createSection(0, "intro", html`
          <div class="intro-background">
            ${introSvg}
          </div>
          <h1>Be whoever you want to be!</h1>
          <p>Create a new profile and step into a new identity! Whether you're a secret agent or a cat lover, our secure browser lets you browse the web with a fresh new perspective.</p>
          <gr-button text="Create new profile" @disabled=${this.canGoNext()} @click=${this.incrementIndex}></gr-button>
        `)}
        ${this.createSection(1, "creation", html`
          <div class="intro-background">
            ${profileSvg}
          </div>
          <gr-button text="${this.canGoNext() ? 'Oh yeah' : 'fill of the data!'}" disabled="${!this.canGoNext()}"></gr-button>
        `)}
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

