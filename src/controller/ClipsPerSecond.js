import { DisplayInt } from "../common/Display.js";
import { Frame } from "../common/Frame.js";
import { Interval2 } from "../common/Interval2.js";

export class ClipsPerSecond {

    #previousPaperclipCount = 0;

    constructor(state, paperclips) {
        this.state = state;

        this.paperclips = paperclips;

        this.count = new DisplayInt(state.count);

        this.frame = new Interval2(1000, (duration) => this.#calculate(duration));
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
        let cps = document.getElementById('clipsPerSecond');

        cps.append('Clips per second: ', this.count.element, br(), br());
    }
}

function br() {
    return document.createElement('br');
}