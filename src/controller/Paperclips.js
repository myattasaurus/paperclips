import { Button, DisplayInt } from "../common/Display.js";

export class Paperclips {
    constructor(paperclips, manualclipper, wire) {
        this.state = paperclips;
        this.state.show = true;

        this.manualclipper = manualclipper;
        this.wire = wire;

        this.count = new DisplayInt(this.state.count);
        this.button = new Button('Make a paperclip', () => this.#makeAPaperclip());
    }

    #makeAPaperclip() {
        if (this.wire.inches > 0) {
            this.wire.inches--;
            this.manualclipper.clipsCreated++;
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