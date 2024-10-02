import { DisplayInt } from "../common/Display.js";
import { div, h2, body, button } from "../common/elements.js"

export class Paperclips {

    #display;

    constructor() {
        this.#display = new DisplayInt(0);
        this.button = null;
    }

    show(game) {
        let ppcs = div('paperclips');

        this.button = button('Make a paperclip', () => game.makeFirstPaperclips());

        ppcs.append(h2('Paperclips: ', this.#display.element));
        ppcs.append(this.button);

        body().append(ppcs);
        return ppcs;
    }

    get value() {
        return this.#display.value;
    }

    set value(value) {
        this.#display.value = value;
    }
}