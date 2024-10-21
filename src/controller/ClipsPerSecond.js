import { DisplayInt } from "../common/Display.js";
import { Interval } from "../common/Interval.js";
import { div, br } from "../common/elements.js";
export class ClipsPerSecond {

    #previousPaperclipCount = 0;

    constructor(state, paperclips) {
        this.state = state;

        this.paperclips = paperclips;

        this.count = new DisplayInt(state.count);

        this.frame = new Interval(1000, (info) => this.#calculate(info.duration));
    }

    #calculate(duration) {
        let currentPaperclipCount = this.paperclips.count;
        let paperclipsSinceLastTick = currentPaperclipCount - this.#previousPaperclipCount;
        this.state.count = Math.round(paperclipsSinceLastTick * 1000 / duration);
        this.#previousPaperclipCount = currentPaperclipCount;
    }

    update(timestamp) {
        this.frame.tick(timestamp);
    }

    draw() {
        this.count.value = this.state.count;
    }

    show() {
        let cps = div('clipsPerSecond');

        cps.append('Clips per second: ', this.count.element, br(), br());
    }
}