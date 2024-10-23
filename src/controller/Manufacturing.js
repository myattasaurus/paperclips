import { div, h3, hr } from "../common/elements.js";
import { GameObject } from "./GameObject.js";

export class Manufacturing extends GameObject {

    constructor(state, clipsPerSecond, wire, autoclippers) {
        super(state);
        this.clipsPerSecond = clipsPerSecond;
        this.wire = wire;
        this.autoclippers = autoclippers;
    }

    show() {
        if (this.business.funds >= this.state.showWhenFundsReach) {
            let mfc = div('manufacturing');

            mfc.append(h3('Manufacturing'));
            mfc.append(hr());

            this.clipsPerSecond.show();
            this.wire.show();
            this.autoclippers.show();

            return true;
        }
        return false;
    }

    load(state) {
        this.state = state.manufacturing;
        this.business = state.business;
    }
}