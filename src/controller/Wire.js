import { DisplayInt, DisplayMoney, Button } from "../common/Display.js";

export class Wire {
    constructor(state, business, autoclippers) {
        this.state = state;
        this.business = business;
        this.autoclippers = autoclippers;

        this.inches = new DisplayInt(this.state.inches);
        this.cost = new DisplayMoney(this.state.cost);
        this.button = new Button('Wire', () => this.#purchase());
    }

    #purchase() {
        if (this.business.funds >= this.state.cost) {
            this.business.funds -= this.state.cost;
            this.state.inches += this.state.purchaseLength;
        }
    }

    update(timestamp) {
        this.button.enabled = this.business.funds >= this.state.cost;
    }

    draw() {
        this.inches.value = this.state.inches;
        this.cost.value = this.state.cost;
    }

    show() {
        let mfc = document.getElementById('wire');

        mfc.append(this.button.element, ' ', this.inches.element, ' inches', br());
        mfc.append('Cost: ', this.cost.element, br(), br());
    }
}

function br() {
    return document.createElement('br');
}