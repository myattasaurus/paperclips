import { DisplayInt, DisplayMoney } from "../common/Display.js";
import { h3, hr, button, br } from "../common/elements.js";

export class Manufacturing {

    constructor() {
    }

    show(business, clipsPerSecond, wire) {
        let mfc = document.getElementById('manufacturing');

        mfc.append(h3('Manufacturing'), hr());
        clipsPerSecond.show(mfc);
        mfc.append(br(), br());
        wire.show(business);
        mfc.append(br(), br());

        return mfc;
    }
}