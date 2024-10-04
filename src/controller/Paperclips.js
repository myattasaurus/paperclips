import { Button, DisplayInt } from "../common/Display.js";
import { Frame } from "../common/Frame.js";

export class Paperclips {
    constructor(state, business, wire, autoclippers) {
        this.state = state;
        this.state.show = true;

        this.business = business;
        this.wire = wire;
        this.autoclippers = autoclippers;

        this.count = new DisplayInt(this.state.count);
        this.button = new Button('Make a paperclip', () => this.#make());

        this.autoclipperInterval = new Frame((duration) => this.#makeByAutoclipper(duration));
    }

    #make(number = 1) {
        if (this.wire.inches > 0) {
            if (number > this.wire.inches) {
                this.state.count += this.wire.inches;
                this.business.unsold += this.wire.inches;
                this.wire.inches = 0;
            } else {
                this.wire.inches -= number;
                this.state.count += number;
                this.business.unsold += number;
            }
        }
    }

    #makeByAutoclipper(duration) {
        let number = this.autoclippers.count * duration / 1000;
        this.#make(number);
    }

    update(timestamp) {
        this.button.enabled = this.wire.inches > 0;
        this.autoclipperInterval.tick(timestamp);
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