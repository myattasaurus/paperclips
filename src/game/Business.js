import { DisplayInt, DisplayMoney } from '../common/Display.js'
import { div, h3, hr, br, button, body } from '../common/elements.js'
import { Interval } from '../common/Interval.js';
import { Market } from './business/Market.js';

export class Business {

    constructor() {
        this.funds = new DisplayMoney(0);
        this.price = new DisplayMoney(25);
        this.market = new Market(this);
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

    show() {
        let bus = document.getElementById('business');

        bus.append(h3('Business'));
        bus.append(hr());
        bus.append('Available funds: ', this.funds.element, br());
        bus.append('Unsold inventory: ', this.unsold.element, br());
        bus.append(
            button('lower', () => this.lowerPrice()),
            button('raise', () => this.raisePrice())
        );
        bus.append(' Price per clip: ', this.price.element, br());
        bus.append('Public demand: ', this.market.demand.element, '%', br());
    }
}