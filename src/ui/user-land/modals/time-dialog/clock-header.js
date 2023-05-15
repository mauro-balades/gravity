import { html, css, LitElement } from "lit";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export class ClockHeader extends LitElement {
    static styles = css`
        :host {
            padding: 20px;
        }

        h3,
        p {
            line-height: 1;
            margin: 1px 0px;

            font-size: 11px;
            font-weight: 600;
        }

        h3 {
            font-size: 16px;
            margin-bottom: 2px;
        }

        p {
            opacity: 0.7;
            font-weight: 500;
        }
    `;

    static properties = {};

    constructor() {
        super();
        setInterval(this.updateTime.bind(this), 1000);
    }

    updateTime() {
        let display = this.shadowRoot.querySelector("p");

        let currentTimeDate = new Date();

        let hour = currentTimeDate.getHours();
        var minutes = currentTimeDate.getMinutes();
        var seconds = currentTimeDate.getSeconds();

        hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = `${currentTimeDate.getDate()} ${
            monthNames[currentTimeDate.getMonth()]
        }, ${hour}:${minutes}:${seconds}`;
    }

    render() {
        return html`
            <h3>Clock</h3>
            <p>Loading clock...</p>
        `;
    }
}
customElements.define("clock-header", ClockHeader);
