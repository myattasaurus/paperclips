export class Frame {
    constructor(run) {
        this.previousTimestamp = 0;
        this.run = run;
        this.tick = this.#firstTick;
    }

    #firstTick(timestamp) {
        this.previousTimestamp = timestamp;
        this.tick = this.#subsequentTicks;
    }

    #subsequentTicks(timestamp) {
        let duration = timestamp - this.previousTimestamp;
        this.run(duration);
        this.previousTimestamp = timestamp;
    }
}