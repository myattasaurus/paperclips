import { DisplayInt, DisplayMoney } from "../common/Display.js";
import { div, h3, hr, button, br, body } from "../common/elements.js";
import { Autoclippers } from "./Autoclippers.js"
import { ClipsPerSecond } from "./ClipsPerSecond.js";

export class Manufacturing {

    #wirePurchaseLength = 1000;

    constructor() {
        this.paperclips = new DisplayInt(0);
        this.clipsPerSecond = new ClipsPerSecond(this.paperclips);
        this.wire = new DisplayInt(this.#wirePurchaseLength);
        this.wireCost = new DisplayMoney(100);
        this.autoclippers = new Autoclippers();
    }

    addWire() {
        this.wire.value += this.#wirePurchaseLength;
    }

    show(game) {
        let mfc = div('manufacturing');

        mfc.append(h3('Manufacturing'), hr());
        this.clipsPerSecond.show(mfc);
        mfc.append(br(), br());
        mfc.append(button('Wire', () => game.buyWire()), ' ', this.wire.element, ' inches', br());
        mfc.append('Cost: ', this.wireCost.element);
        mfc.append(br(), br());
        this.autoclippers.show(game, mfc);

        body().append(mfc);
    }
}