import { DisplayInt, DisplayMoney } from "../common/Display.js"
import { button, br } from "../common/elements.js"
import { Interval } from "../common/Interval.js"

export class Autoclippers {

    #count = new DisplayInt(0);

    #initialCost = 500;
    #cost = new DisplayMoney(this.#initialCost);

    constructor() {
        this.interval = new Interval(1000);
        this.button = null;
    }

    increment() {
        this.count++;
        this.cost = Math.round(Math.pow(1.1, this.count) * 100 + this.#initialCost);

        let clips = 1;
        // TODO calculate clips
        this.interval.frequency = 1000 / this.count;
    }

    enableOrDisablePurchase(businessFunds) {
        if (this.button) {
            this.button.disabled = businessFunds < this.cost;
        }
    }

    show(game) {
        let mfc = document.getElementById('manufacturing');

        this.button = button('Autoclippers', () => game.buyFirstAutoclipper());
        mfc.append(this.button, ' ', this.#count.element, br());
        mfc.append('Cost: ', this.#cost.element);
    }

    get count() {
        return this.#count.value;
    }

    set count(count) {
        this.#count.value = count;
    }

    get cost() {
        return this.#cost.value;
    }

    set cost(cost) {
        this.#cost.value = cost;
    }
}