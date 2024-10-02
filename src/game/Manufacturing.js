import { DisplayInt, DisplayMoney } from "../common/Display.js";
import { div, h3, hr, button, br, body } from "../common/elements.js";

export class Manufacturing {

    #wirePurchaseLength = 1000;

    constructor() {
        this.wire = new DisplayInt(this.#wirePurchaseLength);
        this.wireCost = new DisplayMoney(100);
    }

    addWire() {
        this.wire.value += this.#wirePurchaseLength;
    }

    show(game, clipsPerSecond) {
        let mfc = div('manufacturing');

        mfc.append(h3('Manufacturing'), hr());
        clipsPerSecond.show(mfc);
        mfc.append(br(), br());
        mfc.append(button('Wire', () => game.buyWire()), ' ', this.wire.element, ' inches', br());
        mfc.append('Cost: ', this.wireCost.element);
        mfc.append(br(), br());

        body().append(mfc);
        return mfc;
    }
}