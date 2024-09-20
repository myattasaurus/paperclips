class Game {
    constructor() {
        this.paperclips = new DisplayInt(0);

        this.trafficCop = new TrafficCop();

        this.business = new Business(this);
    }

    makeAPaperclip() {
        this.trafficCop.emit(Event.MADE_A_PAPERCLIP, ++this.paperclips.value);
    }

    show() {
        let ppcs = div('paperclips');

        ppcs.append(h2('Paperclips: ', this.paperclips.element));
        ppcs.append(button('Make a paperclip', 'game.makeAPaperclip()'), button('sell', 'game.business.sell()'));

        document.getElementsByTagName('body')[0].append(ppcs);
    }
}

class DisplayInt {

    #value;

    constructor(value) {
        this.element = document.createElement('span');
        this.value = value;
    }

    get value() {
        return this.#value;
    }

    set value(text) {
        this.#value = text;
        this.element.innerHTML = this.toString();
    }

    toString() {
        return this.#value;
    }
}

class DisplayMoney extends DisplayInt {
    constructor(value) {
        super(value);
    }

    toString() {
        let dollars = Math.floor(this.value / 100);
        let cents = this.value % 100;
        return `$${dollars}.${cents < 10 ? '0' : ''}${cents}`;
    }
}

class Event {
    static MADE_A_PAPERCLIP = 0;
    static SIZE = 1;
}

class Fcn {
    static INCREMENT_UNSOLD = 0;
    static SHOW_BUSINESS = 1;
}

class TrafficCop {
    constructor() {
        this.events = new Map();
        for (let eventId = 0; eventId < Event.SIZE; eventId++) {
            this.events.set(eventId, new Map());
        }
    }

    emit(event, data) {
        let eventMap = this.events.get(event);
        for (let fcnName of eventMap.keys()) {
            eventMap.get(fcnName)(data);
        }
    }

    subscribe(event, fcnName, fcn) {
        this.events.get(event).set(fcnName, fcn);
    }

    unsubscribe(event, fcnName) {
        this.events.get(event).delete(fcnName);
    }
}

class Business {

    #marketFrequency = 1000;

    constructor(game) {
        this.funds = new DisplayMoney(0);
        this.price = new DisplayMoney(25);
        this.marketDemand = new DisplayInt(32);
        this.unsold = new DisplayInt(game.paperclips.value);

        game.trafficCop.subscribe(Event.MADE_A_PAPERCLIP, Fcn.INCREMENT_UNSOLD, (data) => {
            this.unsold.value++;
        });
        game.trafficCop.subscribe(Event.MADE_A_PAPERCLIP, Fcn.SHOW_BUSINESS, (data) => {
            if (data == 2) {
                this.show();
                this.startMarket();
                game.trafficCop.unsubscribe(Event.MADE_A_PAPERCLIP, Fcn.SHOW_BUSINESS);
            }
        });
    }

    sell() {
        if (this.unsold.value > 0) {
            this.unsold.value--;
            this.funds.value += this.price.value;
        }
    }

    lowerPrice() {
        this.price.value--;
    }

    raisePrice() {
        this.price.value++;
    }

    show() {
        let bus = div('business');

        bus.append(h3('Business'));
        bus.append(hr());
        bus.append('Available funds: ', this.funds.element, br());
        bus.append('Unsold inventory: ', this.unsold.element, br());
        bus.append(button('lower', 'game.business.lowerPrice()'), button('raise', 'game.business.raisePrice()'), ' Price per clip: ', this.price.element, br());
        bus.append('Public demand: ', this.marketDemand.element, '%', br());

        document.getElementsByTagName('body')[0].append(bus);
    }

    startMarket() {
        setTimeout(() => {
            if (Math.random() * 100 <= this.marketDemand.value) {
                this.sell();
            }
            this.startMarket();
        },
            this.#marketFrequency);
    }
}

let game;

function onLoad() {
    game = new Game();
    game.show();
}

// Elements
function div(id) {
    let element = document.createElement('div');
    element.setAttribute('id', id);
    return element;
}

function h2(...elements) {
    let element = document.createElement('h2');
    element.append(...elements);
    return element;
}

function h3(text) {
    let element = document.createElement('h3');
    element.innerHTML = text;
    return element;
}

function br() {
    return document.createElement('br');
}

function hr() {
    return document.createElement('hr');
}

function span(id, text = '') {
    let element = document.createElement('span');
    element.setAttribute('id', id);
    element.innerHTML = text;
    return element;
}

function button(name, onclick) {
    let element = document.createElement('button');
    element.setAttribute('onclick', onclick);
    element.innerHTML = name;
    return element;
}