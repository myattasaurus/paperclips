import { Button, DisplayInt, DisplayMoney } from "../common/Display.js";
import { Interval2 } from "../common/Interval2.js";

export class Business {

    constructor(state, manualclipper) {
        this.state = state;

        this.funds = new DisplayMoney(state.funds);
        this.price = new DisplayMoney(state.price);
        this.unsold = new DisplayInt(state.unsold);
        this.marketDemand = new DisplayInt(state.marketDemand);

        this.lowerButton = new Button('lower', () => this.#lowerPrice());
        this.raiseButton = new Button('raise', () => this.#raisePrice());

        this.sellInterval = new Interval2(500, () => this.#sell());

        this.update = (timestamp) => {
            if (manualclipper.clipsCreated >= this.state.showWhenClipsReach) {
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

    #sell() {
        if (this.state.unsold > 0) {
            this.state.funds += this.state.price;
            this.state.sold++;
        }
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
        let bus = document.getElementById('business');

        let h3 = document.createElement('h3');
        h3.append('Business');
        bus.append(h3);
        bus.append(document.createElement('hr'));

        bus.append('Available funds: ', this.funds.element, br());
        bus.append('Unsold inventory: ', this.unsold.element, br());
        bus.append(this.lowerButton.element, this.raiseButton.element, ' Price per clip: ', this.price.element, br());
        bus.append('Public demand: ', this.marketDemand.element, '%', br());
    }
}

function br() {
    return document.createElement('br');
}