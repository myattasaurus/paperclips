import { DisplayInt } from "../common/Display.js";
import { Interval } from "../common/Interval.js";
import { div, br } from "../common/elements.js";
import { Game } from "../model/Game.js";
export class ClipsPerSecond {

    #previousPaperclipCount = 0;

    constructor() {
        this.count = new DisplayInt(this.state.count);

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

    get state() {
        return Game.state.manufacturing.clipsPerSecond;
    }

    get paperclips() {
        return Game.state.paperclips;
    }
}