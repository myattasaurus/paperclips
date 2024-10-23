export class Frame {
    constructor(run = (duration) => { }, runOnVisible = run) {
        this.previousTimestamp = 0;
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
}