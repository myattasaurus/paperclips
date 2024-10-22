import { DisplayInt } from "../common/Display.js";
import { Interval } from "../common/Interval.js";
import { div, br } from "../common/elements.js";
import { Game } from "../model/Game.js";
import { GameObject } from "./GameObject.js";

export class ClipsPerSecond extends GameObject {

    #previousPaperclipCount = 0;

    constructor(state) {
        super(state);
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

    save(state) {
        state.manufacturing.clipsPerSecond = this.state;
    }

    load(state) {
        this.state = state.manufacturing.clipsPerSecond;
        this.paperclips = state.paperclips;
    }
}