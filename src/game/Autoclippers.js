import { DisplayInt, DisplayMoney } from "../common/Display.js"
import { button, br } from "../common/elements.js"
import { Interval } from "../common/Interval.js"

export class Autoclippers {

    #count = new DisplayInt(0);

    #initialCost = 500;
    #cost = new DisplayMoney(this.#initialCost);

    #interval = new Interval();

    constructor() { }

    increment(callback) {
        this.count++;
        this.cost = Math.round(Math.pow(1.1, this.count) * 100 + this.#initialCost);

        let clips = 1;
        // TODO calculate clips
        this.#interval.update(this.count, () => callback(clips));
    }

    show(game, mfc) {
        mfc.append(button('Autoclippers', () => game.buyAutoclipper()), ' ', this.#count.element, br());
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