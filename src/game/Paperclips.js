import { DisplayInt } from "../common/Display.js";
import { h2, button } from "../common/elements.js"

export class Paperclips {

    // TODO
    // manual amount
    //
    // baseline autoclipper amount
    // baseline autoclipper timestamp
    // number of autoclippers

    #display;

    constructor() {
        this.#display = new DisplayInt(0);
        this.button = null;
    }

    show(game) {
        let ppcs = document.getElementById('paperclips');

        this.button = button('Make a paperclip', () => game.makeFirstPaperclips());

        ppcs.append(h2('Paperclips: ', this.#display.element));
        ppcs.append(this.button);

        return ppcs;
    }

    get value() {
        return this.#display.value;
    }

    set value(value) {
        this.#display.value = value;
    }
}