import { div, h3, hr } from "../common/elements.js";
import { Game } from "../model/Game.js";
import { GameObject } from "./GameObject.js";

export class Manufacturing extends GameObject {
    constructor(state) {
        super(state);
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

    save(state) {
        state.manufacturing = this.state;
    }

    load(state) {
        this.state = state.manufacturing;
        this.business = state.business;
    }
}