import { DisplayInt, DisplayMoney } from "../../common/Display.js";
import { button, br } from "../../common/elements.js";

export class Wire {

    constructor(init) {
        this.purchaseLength = init.purchaseLength;
        this.length = new DisplayInt(this.purchaseLength);
        this.cost = new DisplayMoney(init.cost);
        this.button = null;
    }

    purchase() {
        this.length.value += this.purchaseLength;
    }

    enableOrDisablePurchase(businessFunds) {
        if (this.button) {
            this.button.disabled = businessFunds < this.cost.value;
        }
    }

    show(business) {
        let mfc = document.getElementById('manufacturing');

        this.button = button('Wire', () => business.buy(this));
        mfc.append(this.button, ' ', this.length.element, ' inches', br());
        mfc.append('Cost: ', this.cost.element);
    }
}