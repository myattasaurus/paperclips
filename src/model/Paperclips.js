export class Paperclips {

    #manualclipper;

    constructor(manualclipper, wire) {
        this.#manualclipper = manualclipper;
    }

    get count() {
        return this.#manualclipper.clipsCreated;
    }
}