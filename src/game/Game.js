import { DisplayInt } from '../common/Display.js'
import { Business } from './Business.js'
import { div, h2, button, body } from '../common/elements.js'
import { Manufacturing } from './Manufacturing.js';

export class Game {
    constructor() {
        this.business = new Business();
        this.manufacturing = new Manufacturing();
    }

    makePaperclip(clips = 1) {
        if (this.manufacturing.wire.value > 0) {
            this.manufacturing.wire.value -= clips;
            this.manufacturing.paperclips.value += clips;
            this.business.unsold.value += clips;
        }
        if (this.manufacturing.paperclips.value == 2) {
            this.business.show();
            this.business.startMarket();
        }
    }

    buyWire() {
        this.business.buy(this.manufacturing.wireCost.value, () => this.manufacturing.addWire());
    }

    buyAutoclipper() {
        this.business.buy(this.manufacturing.autoclippers.cost, () => {
            this.manufacturing.autoclippers.increment((clips) => this.makePaperclip(clips));
        });
    }

    show() {
        let ppcs = div('paperclips');

        ppcs.append(h2('Paperclips: ', this.manufacturing.paperclips.element));
        ppcs.append(
            button('Make a paperclip', () => {
                this.makePaperclip();
            }),
            button('show', () => {
                this.manufacturing.show(this);
            })
        );

        body().append(ppcs);
    }
}