import { Button, DisplayInt, DisplayMoney } from "../common/Display.js";
import { Interval } from "../common/Interval.js";
import { div, h3, hr, br } from "../common/elements.js";

export class Business {

    constructor(state, paperclips) {
        this.state = state;

        this.funds = new DisplayMoney(state.funds);
        this.price = new DisplayMoney(state.price);
        this.unsold = new DisplayInt(state.unsold);
        this.marketDemand = new DisplayInt(state.marketDemand);

        this.lowerButton = new Button('lower', () => this.#lowerPrice());
        this.raiseButton = new Button('raise', () => this.#raisePrice());

        this.sellInterval = new Interval(500, (cycles) => this.#sell(cycles));

        this.update = (timestamp) => {
            if (paperclips.count >= this.state.showWhenClipsReach) {
                this.state.show = true;
                this.update = this.#update;
            }
        };
    }

    #lowerPrice() {
        this.state.price--;
    }

    #raisePrice() {
        this.state.price++;
    }

    #sell(cycles) {
        let clipsToSell = Math.min(this.state.unsold, cycles);
        this.state.funds += clipsToSell * this.state.price;
        this.state.unsold -= clipsToSell;
    }

    #update(timestamp) {
        this.sellInterval.tick(timestamp);
    }

    draw() {
        this.funds.value = this.state.funds;
        this.price.value = this.state.price;
        this.unsold.value = this.state.unsold;
        this.marketDemand.value = this.state.marketDemand;
    }

    show() {
        let bus = div('business');

        bus.append(h3('Business'));
        bus.append(hr());

        bus.append('Available funds: ', this.funds.element, br());
        bus.append('Unsold inventory: ', this.unsold.element, br());
        bus.append(this.lowerButton.element, this.raiseButton.element, ' Price per clip: ', this.price.element, br());
        bus.append('Public demand: ', this.marketDemand.element, '%', br());
    }
}