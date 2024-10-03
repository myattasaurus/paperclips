import { Business } from "./Business.js";
import { Paperclips } from "./Paperclips.js";

export class State {
    constructor(init) {
        for (let key of Object.keys(init)) {
            this[key] = init[key];
        }
        this.paperclips = new Paperclips(init.manualclipper);
        this.business = new Business(init.business, this.paperclips);
    }
}