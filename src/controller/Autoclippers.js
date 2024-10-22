import { Button, DisplayInt, DisplayMoney } from "../common/Display.js";
import { div, br } from "../common/elements.js";
import { Game } from "../model/Game.js";
import { GameObject } from "./GameObject.js";

export class Autoclippers extends GameObject {

    #initialCost;

    constructor(state) {
        super(state);
        this.#initialCost = this.state.cost;

        this.count = new DisplayInt(this.state.count);
        this.cost = new DisplayMoney(this.state.cost);
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
        let mfc = div('autoclippers');

        mfc.append(this.button.element, ' ', this.count.element, br());
        mfc.append('Cost: ', this.cost.element);
    }

    save(state) {
        state.manufacturing.autoclippers = this.state;
    }

    load(state) {
        this.state = state.manufacturing.autoclippers;
        this.business = state.business;
    }
}