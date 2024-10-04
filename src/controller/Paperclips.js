import { Button, DisplayInt } from "../common/Display.js";

export class Paperclips {
    constructor(state, wire) {
        this.state = state;
        this.state.show = true;

        this.wire = wire;

        this.count = new DisplayInt(this.state.count);
        this.button = new Button('Make a paperclip', () => this.#makeAPaperclip());
    }

    #makeAPaperclip() {
        if (this.wire.inches > 0) {
            this.wire.inches--;
            this.state.count++;
        }
    }

    update(timestamp) {

    }

    draw() {
        this.count.value = this.state.count;
    }

    show() {
        let ppcs = document.getElementById('paperclips');

        let h2 = document.createElement('h2');
        h2.append('Paperclips: ', this.count.element);

        ppcs.append(h2);
        ppcs.append(this.button.element);
    }
}