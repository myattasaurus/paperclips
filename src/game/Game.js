import { DisplayInt } from '../common/Display.js'
import { Business } from './Business.js'
import { div, h2, button, body } from '../common/elements.js'
import { Manufacturing } from './Manufacturing.js';
import { Engine } from '../common/Engine.js';
import { Autoclippers } from './Autoclippers.js';
import { Time } from '../common/Time.js';
import { Paperclips } from './Paperclips.js';
import { ClipsPerSecond } from "./ClipsPerSecond.js";

export class Game {
    constructor() {
        this.engine = new Engine();

        this.business = new Business();

        this.paperclips = new Paperclips();
        this.clipsPerSecond = new ClipsPerSecond(this.paperclips);
        this.engine.add(this.clipsPerSecond.interval);

        this.manufacturing = new Manufacturing();

        this.autoclippers = new Autoclippers();
        this.engine.onEveryFrame(() => {
            this.autoclippers.enableOrDisablePurchase(this.business.funds.value);
        });
    }

    makeFirstPaperclips() {
        this.makePaperclip();
        if (this.paperclips.value == 2) {
            this.business.show();
            this.engine.add(this.business.market.interval);
            this.paperclips.button.onclick = () => this.makePaperclip();
        }
    }

    makePaperclip(clips = 1) {
        if (this.manufacturing.wire.value > 0) {
            this.manufacturing.wire.value -= clips;
            this.paperclips.value += clips;
            this.business.unsold.value += clips;
        }
    }

    buyWire() {
        this.business.buy(this.manufacturing.wireCost.value, () => this.manufacturing.addWire());
    }

    buyFirstAutoclipper() {
        this.buyAutoclipper();
        this.autoclippers.button.onclick = () => this.buyAutoclipper();
        this.autoclippers.interval.update = () => {
            this.makePaperclip();
        };
        this.engine.add(this.autoclippers.interval);
    }

    buyAutoclipper() {
        this.business.buy(this.autoclippers.cost, () => {
            this.autoclippers.increment();
        });
    }

    show() {
        let ppcs = this.paperclips.show(this);

        ppcs.append(
            button('show', () => {
                this.manufacturing.show(this, this.clipsPerSecond);
                this.autoclippers.show(this);
            })
        );
    }
}