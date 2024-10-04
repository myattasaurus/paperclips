import { Button, DisplayInt, DisplayMoney } from "../common/Display.js";

export class Autoclippers {

    #initialCost;

    constructor(state, business) {
        this.state = state;
        this.business = business;

        this.#initialCost = state.cost;

        this.count = new DisplayInt(state.count);
        this.cost = new DisplayMoney(state.cost);
        this.button = new Button('Autoclippers', () => this.#purchase());
    }

    #purchase() {
        if (this.business.funds >= this.state.cost) {
            this.business.funds -= this.state.cost;
            this.state.count++;
            this.state.cost = Math.round(Math.pow(1.1, this.state.count) * 100 + this.#initialCost);
        }
    }

    update(timestamp) {
        this.button.enabled = this.business.funds >= this.state.cost;
    }

    draw() {
        this.count.value = this.state.count;
        this.cost.value = this.state.cost;
    }

    show() {
        let mfc = document.getElementById('manufacturing');

        mfc.append(this.button.element, ' ', this.count.element, br());
        mfc.append('Cost: ', this.cost.element);
    }
}

function br() {
    return document.createElement('br');
}