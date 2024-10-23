export class Frame2 {
    constructor(state, run = (duration) => { }, runOnVisible = run) {
        this.load(state);
        this.run = run;
        this.runOnVisible = runOnVisible;
        this.tick = this.#firstTick;
    }

    #firstTick(timestamp) {
        this.previousTimestamp = timestamp;
        this.tick = this.#subsequentTicks;
    }

    #subsequentTicks(timestamp) {
        this.#tick(timestamp, this.run);
    }

    onVisible(timestamp) {
        this.#tick(timestamp, this.runOnVisible);
    }

    #tick(timestamp, fcn) {
        let duration = timestamp - this.previousTimestamp;
        fcn(duration);
        this.previousTimestamp = timestamp;
    }

    save(state) {
        state.previousTimestamp = this.previousTimestamp;
    }

    load(state) {
        this.previousTimestamp = state.previousTimestamp ? state.previousTimestamp : 0;
    }
}