import { DisplayInt } from "../../common/Display.js";
import { Interval } from "../../common/Interval.js";

export class ClipsPerSecond {

    #value = new DisplayInt(0);

    #previous = 0;

    constructor(paperclips) {
        this.interval = new Interval(1000, (millisSinceLastInterval) => {
            console.log(millisSinceLastInterval);
            let current = paperclips.value;
            this.#value.value = Math.round((current - this.#previous) * 1000 / millisSinceLastInterval);
            console.log(current + ', ' + this.#previous + ', ' + this.#value.value);
            this.#previous = current;
        });
    }

    show(mfc) {
        mfc.append('Clips per second: ', this.#value.element);
    }
}