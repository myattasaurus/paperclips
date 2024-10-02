import { DisplayInt } from "../../common/Display.js";
import { Interval } from "../../common/Interval.js";

export class ClipsPerSecond {

    #value = new DisplayInt(0);

    #previous = 0;

    constructor(paperclips) {
        this.interval = new Interval(1000, () => {
            let current = paperclips.value;
            this.#value.value = current - this.#previous;
            this.#previous = current;
        });
    }

    show(mfc) {
        mfc.append('Clips per second: ', this.#value.element);
    }
}