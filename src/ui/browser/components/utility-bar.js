
import {html, css, LitElement} from 'lit';

export class UtilityBar extends LitElement {
  static styles = css`
    :host {
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        border-top: 1px solid rgba(0,0,0,.1);

        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        height: 30px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px 0 15px;
    }

    :host::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        z-index: -1;
        background: var(--gr-primary-background);
    }

    svg {
        width: 15px;
        height: 15px;

        transition: .01s;
        padding: 7px;
        cursor: pointer;

        border: 1px solid transparent;
    }

    svg:hover {
        background: rgba(0,0,0,.05);
        border-color: rgba(0,0,0,.1);
    }

    svg:active {
        width: 13px;
        height: 13px;

        padding: 8px;
    }

    :host > div {
        display: flex;
        align-items: center;
    }

    :host div > span {
      position: relative;
    }

    :host > div:fist-of-type {
        height: -webkit-fill-available;
    }

    :host > div:last-of-type {
        margin: auto 0 0 0;
    }

    #gravity-time-display {
      font-size: 12px;
      font-weight: 500;
      margin-left: 5px;
      cursor: pointer;
      height: 100%;

      display: flex;
      align-items: center;
    }

    .separator {
      background: rgba(0,0,0,.7);
      height: 15px;
      width: 1px;
      border-radius: 1px;
      margin: 0 5px;
    }

    #gravity-time-display { width: fit-content; }

    span:has( #gravity-time-display) {
      cursor: pointer;
    }
  `;

  static properties = {
  };

  constructor() {
    super();


    this.setUpTimeDialogClose();

    setInterval(this.updateTime.bind(this), 1000)
    setTimeout(() => window.addEventListener("resize", this.timeDialogResize.bind(this)));
  }

  updateTime() {
    let display = this.shadowRoot.querySelector("#gravity-time-display");

    let currentTimeDate = new Date();

    let hour = currentTimeDate.getHours();
    var minutes =  currentTimeDate.getMinutes();

    hour = hour < 10 ? '0'+hour : hour;
    minutes = minutes < 10 ? '0'+minutes : minutes;

    display.innerHTML = `${hour}:${minutes}`
  }

  timeDialogOpen() {
    window.electronAPI.timeDialogOpen();
    this.timeDialogResize();
  }

  setUpTimeDialogClose() {
    window.addEventListener("click", (e) => {
      if (event.path[0] != this.shadowRoot.querySelector("#gravity-time-display")) {
        window.electronAPI.timeDialogClose();
      }
    })
  }

  timeDialogResize() {
    let dialog = this.shadowRoot.querySelector("#time-dialog");
    let { x,y,width,height } = dialog.getBoundingClientRect();
    window.electronAPI.timeDialogResize({ x,y,width,height });
  }

  render() {
    return html`
    <div>
        <span title="Enable pause mode">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"></path>
          </svg>
        </span>
        <span title="Sound manager">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
        </span>
        <span>
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"></path>
          </svg>
        </span>
        <span>
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
          </svg>
        </span>
        <div class="separator"></div>
        <span style="height: 30px; display: flex; align-items: center;" @click=${this.timeDialogOpen.bind(this)}>
          <time-dialog id="time-dialog"></time-dialog>
          <span id="gravity-time-display">Loading...</span>
        </span>
    </div>
    <div>
      <svg title="Take screenshot" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
      </svg>
      <svg title="Measure internet speed" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"></path>
      </svg>
      <svg title="Edit browser grid" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"></path>
      </svg>
    </div>
    `;
  }
}
customElements.define('utility-bar', UtilityBar);

