import {html, css, LitElement} from 'lit';

export class AnalogClock extends LitElement {
    static styles = css`
        :host {
            width: 100%;
            height: 100px;

            border: 1px solid rgba(0, 0, 0, 0.3);
            border-left-color: transparent;
            border-right-color: transparent;

            /*TODO: fix this for dark themes too!*/
            background: rgba(255,255,255,0.5);

            display: flex;
            align-items: center;
            justify-content: center;
        }

        :host::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: .6;
            background: var(--gr-secondary-background);
            border-radius: 6px;
        }

        .clock {
            width: 100px;
            height: 100px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            opacity: .8;
        }

        .clock .dot {
            background-color: var(--gr-primary-color);
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        .clock .hour,
        .clock .min,
        .clock .sec {
            position: absolute;
            background-color: var(--gr-primary-color);
            transform-origin: 50% 100%;
            border-radius: 2px;
        }

        .clock .hour.animate,
        .clock .min.animate,
        .clock .sec.animate {
            transition: all 0.6s ease-in-out;
        }

        .clock .hour {
            width: 4px;
            height: 35%;
            top: 15%;
        }

        .clock .min {
            width: 2.5px;
            height: 40%;
            top: 10%;
        }

        .clock .sec {
            width: 1px;
            height: 42%;
            top: 7%;
            background-color: #F05A5A;
        }

        .clock .dot {
            background-color: var(--gr-primary-color);
        }

        .clock .hour,
        .clock .min,
        .clock .sec {
            background-color: var(--gr-primary-color);
        }
    `;

    static properties = {};

    constructor() {
        super();

        setTimeout(this.initializeClock.bind(this), 500);
    }

    initializeClock() {
        let elem = ".clock";
        var hourHand = this.shadowRoot.querySelector(elem + " .hour");
        var minuteHand = this.shadowRoot.querySelector(elem + " .min");
        var secondHand = this.shadowRoot.querySelector(elem + " .sec");

        function runClock() {
            // Getting current time
            var currentTime = new Date();

            // Getting hour handle degree based on decimal hour value calculated
            // from current hour and curent minutes
            var hoursDegree =
                (currentTime.getHours() + currentTime.getMinutes() / 60) * 30; // 360/12

            //Getting minute handle degree
            var minutesDegree = currentTime.getMinutes() * 6; // 360/60
            //Getting second handle degree
            var secondsDegree = currentTime.getSeconds() * 6; // 360/60

            // Addint rotate attributes to handles
            hourHand.style.transform = "rotate(" + hoursDegree + "deg)";
            minuteHand.style.transform = "rotate(" + minutesDegree + "deg)";
            secondHand.style.transform = "rotate(" + secondsDegree + "deg)";
        }

        // Starting runClock function
        runClock();

        // Removing animate class from handles after animation is finished
        setTimeout(function () {
            hourHand.classList.remove("animate");
            minuteHand.classList.remove("animate");
            secondHand.classList.remove("animate");
        }, 600);

        // Setting clock interval for every second
        setInterval(runClock, 1000);
    }

    render() {
        return html`
            <div class="clock">
                <div class="dot"></div>
                <!-- clock dot, esthetic only -->
                <div class="sec animate"></div>
                <!-- clock second -->
                <div class="min animate"></div>
                <!-- clock minute -->
                <div class="hour animate"></div>
                <!-- clock hour -->
            </div>
        `;
    }
}
customElements.define('analog-clock', AnalogClock);
