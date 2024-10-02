import { DisplayInt, DisplayMoney } from "../common/Display.js";
import { button, br } from "../common/elements.js";

export class Wire {

    constructor() {
        this.purchaseLength = 1000;
        this.length = new DisplayInt(this.purchaseLength);
        this.cost = new DisplayMoney(100);
    }

    purchase() {
        this.length.value += this.purchaseLength;
    }

    show(business) {
        let mfc = document.getElementById('manufacturing');

        mfc.append(button('Wire', () => business.buy(this)), ' ', this.length.element, ' inches', br());
        mfc.append('Cost: ', this.cost.element);
    }
}