export class Paperclips {

    #manualclipper;

    constructor(manualclipper) {
        this.#manualclipper = manualclipper;
    }

    get count() {
        return this.#manualclipper.clipsCreated;
    }
}