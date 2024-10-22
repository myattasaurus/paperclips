import { div, h3, hr } from "../common/elements.js";
import { Game } from "../model/Game.js";

export class Manufacturing {
    constructor() {
        this.update = this.#showIfApplicable;
    }

    #showIfApplicable(timestamp) {
        if (this.business.funds >= this.state.showWhenFundsReach) {
            this.state.show = true;
            this.state.clipsPerSecond.show = true;
            this.state.wire.show = true;
            this.state.autoclippers.show = true;
            this.update = this.#update;
        }
    }

    #update(timestamp) {

    }

    draw() {

    }

    show() {
        let mfc = div('manufacturing');

        mfc.append(h3('Manufacturing'));
        mfc.append(hr());
    }

    get state() {
        return Game.state.manufacturing;
    }

    get business() {
        return Game.state.business;
    }
}