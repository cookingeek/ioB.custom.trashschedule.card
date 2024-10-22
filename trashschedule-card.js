// TrashSchedule Card
// https://github.com/cookingeek/ioB.custom.trashschedule.card

class TrashSchedule extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

    }

    /* This is called every time the sensor is updated */
    set hass(hass) {
        const config = this.config;
        const locale = config.locale || undefined;

        const daysleftId = config.daysleft;
        const dateId = config.date;
        const trashtype = config.trashtype;
        const trashcolorId = config.trashcolor;

        const date = hass.states[dateId];
        const daysleft = hass.states[daysleftId];
        const trashcolor = hass.states[trashcolorId];

        const daysLeftState = daysleft.state;
        const trashcolorState = trashcolor.state
        const timezone = config.timezone;

      
        // Parse the event date
        const event = new Date(parseInt(date.state));
        const eventDay = event.toLocaleDateString(locale, { weekday: 'long', timeZone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone});

        // Configure the day string based on the number of days left
        const dayString = config.dayPlural || 'Tagen';

        const text = daysLeftState === '1' ? config.text1 || "Heute rausstellen" : daysLeftState === '0' ? config.text2|| "Heute wird abgeholt" : eventDay + " in " + daysLeftState + " " + dayString;
        // Build the card HTML content
        const card = `
            <div class="trashcard" id="${trashtype}">
                <div class="title" id="title">${trashtype}</div>
                <div class="trashbin" id="trashbin" style="background-color:${trashcolorState}"></div>
                <div class="days" id="days">${text}</div>
            </div>
        `;


        // Update the card content in the shadow DOM
        this.shadowRoot.getElementById('container').innerHTML = card;

    }

    /* This is called only when the config is updated */
    setConfig(config) {

        const root = this.shadowRoot;
        if (root.lastChild) root.removeChild(root.lastChild);

        this.config = config;

        const card = document.createElement('ha-card');
        const content = document.createElement('div');
        const style = document.createElement('style');

        style.textContent = `
            .container {
                padding: 5px;
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
                align-items: flex-start;
                text-align: -webkit-center;
                text-align: -moz-center;
            }
            .trashcard {
                padding: 5px 0;
                margin: auto;
                text-align: -webkit-center;
                text-align: -moz-center;
            }
            .trashbin {
                width: 50px;
                height: 50px;
                mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"/></svg>');
                mask-size: auto 50px;
                mask-repeat: no-repeat;
                text-align: -webkit-center;
                text-align: -moz-center;
            }
            .title {
                text-align: -webkit-center;
                text-align: -moz-center;
                padding: 5px 0;
                font-size: 16px;
            }
        `;

        content.id = "container";
        content.className = "container";
        card.header = config.title;
        card.appendChild(style);
        card.appendChild(content);

        root.appendChild(card);
    }

    // The height of the card
    getCardSize() {
        return 1;
    }
}

customElements.define('trashschedule-card', TrashSchedule);
