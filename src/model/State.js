import { Business } from "./Business.js";

export class State {
    constructor(init) {
        for (let key of Object.keys(init)) {
            this[key] = init[key];
        }
        this.business = new Business(init.business, this.paperclips);
    }
}