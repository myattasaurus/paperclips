export class Business {

    #paperclips;

    constructor(init, paperclips) {
        for (let key of Object.keys(init)) {
            this[key] = init[key];
        }
        this.#paperclips = paperclips;
    }

    get unsold() {
        return this.#paperclips.count - this.sold;
    }
}