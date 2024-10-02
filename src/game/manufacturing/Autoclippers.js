import { DisplayInt, DisplayMoney } from "../../common/Display.js"
import { button, br } from "../../common/elements.js"
import { Interval } from "../../common/Interval.js"

export class Autoclippers {

    #initialCost = 500;

    constructor(init) {
        this.count = new DisplayInt(init.count);
        this.cost = new DisplayMoney(this.#initialCost);
        this.interval = new Interval(1000);
        this.button = null;
    }

    purchase() {
        this.count.value++;
        this.cost.value = Math.round(Math.pow(1.1, this.count.value) * 100 + this.#initialCost);

        this.interval.frequency = 1000 / this.count.value;
    }

    enableOrDisablePurchase(businessFunds) {
        if (this.button) {
            this.button.disabled = businessFunds < this.cost.value;
        }
    }

    clipsMadeInTheLastInterval(millis) {
        return this.count.value * millis / 1000;
    }

    show(game) {
        let mfc = document.getElementById('manufacturing');

        this.button = button('Autoclippers', () => game.buyFirstAutoclipper());
        mfc.append(this.button, ' ', this.count.element, br());
        mfc.append('Cost: ', this.cost.element);
    }
}