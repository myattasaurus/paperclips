import { Button, DisplayInt } from "../common/Display.js";

export class Paperclips {
    constructor(paperclips, manualclipper, business) {
        this.view = paperclips;
        this.view.show = true;

        this.manualclipper = manualclipper;
        this.business = business;

        this.count = new DisplayInt(this.view.count);
        this.button = new Button('Make a paperclip', () => this.#makeFirstPaperclips());
    }

    #makeFirstPaperclips() {
        this.#makeAPaperclip();
        if (this.manualclipper.clipsCreated >= this.business.showWhenClipsReach) {
            this.business.show = true;
            this.button.onclick = () => this.#makeAPaperclip();
        }
    }

    #makeAPaperclip() {
        this.manualclipper.clipsCreated++;
    }

    update(timestamp) {
        this.view.count = this.manualclipper.clipsCreated;
    }

    draw() {
        this.count.value = this.view.count;
    }

    show() {
        let ppcs = document.getElementById('paperclips');

        let h2 = document.createElement('h2');
        h2.append('Paperclips: ', this.count.element);

        ppcs.append(h2);
        ppcs.append(this.button.element);
    }
}