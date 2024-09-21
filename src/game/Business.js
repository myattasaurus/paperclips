import { DisplayInt, DisplayMoney } from '../common/Display.js'
import { div, h3, hr, br, button, body } from '../common/elements.js'

export class Business {

    #marketFrequency = 500;

    constructor() {
        this.funds = new DisplayMoney(0);
        this.price = new DisplayMoney(25);
        this.marketDemand = new DisplayInt(100);
        this.unsold = new DisplayInt(0);
    }

    buy(cost, callback) {
        if (cost <= this.funds.value) {
            this.funds.value -= cost;
            callback();
        }
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

    startMarket() {
        setTimeout(() => {
            if (Math.random() * 100 <= this.marketDemand.value) {
                this.sell();
            }
            this.startMarket();
        },
            this.#marketFrequency);
    }

    show() {
        let bus = div('business');

        bus.append(h3('Business'));
        bus.append(hr());
        bus.append('Available funds: ', this.funds.element, br());
        bus.append('Unsold inventory: ', this.unsold.element, br());
        bus.append(
            button('lower', () => this.lowerPrice()),
            button('raise', () => this.raisePrice())
        );
        bus.append(' Price per clip: ', this.price.element, br());
        bus.append('Public demand: ', this.marketDemand.element, '%', br());

        body().append(bus);
    }
}