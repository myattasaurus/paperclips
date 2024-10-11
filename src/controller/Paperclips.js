import { Button, DisplayInt, Paperclip } from "../common/Display.js";
import { Frame } from "../common/Frame.js";
import { div, h2 } from "../common/elements.js";

export class Paperclips {

    #autoclipperDuration = 0;

    constructor(state, business, wire, autoclippers) {
        this.state = state;
        this.state.show = true;

        this.business = business;
        this.wire = wire;
        this.autoclippers = autoclippers;

        this.count = new DisplayInt(this.state.count);
        this.button = new Button('Make a paperclip', () => {
            this.#make();
            new Paperclip(this.button.element).animate();
        });

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
        if (this.autoclippers.count > 0) {
            this.#autoclipperDuration += duration;
        }
        let durationPerClip = 1000 / this.autoclippers.count;
        if (this.#autoclipperDuration > durationPerClip) {
            let number = Math.floor(this.#autoclipperDuration / durationPerClip);
            this.#autoclipperDuration -= number * durationPerClip;
            this.#make(number);
        }
    }

    update(timestamp) {
        this.button.enabled = this.wire.inches > 0;
        this.autoclipperInterval.tick(timestamp);
    }

    draw() {
        this.count.value = this.state.count;
    }

    show() {
        let ppcs = div('paperclips');

        ppcs.append(h2('Paperclips: ', this.count.element));
        ppcs.append(this.button.element);
    }
}