export class Interval {
    constructor(time, run) {
        this.time = time;
        this.previousTimestamp = 0;
        this.remainder = 0;
        this.run = run;
        this.tick = this.#firstTick;
    }

    #firstTick(timestamp) {
        this.previousTimestamp = timestamp - this.time;
        this.tick = this.#subsequentTicks;
        this.tick(timestamp);
    }

    #subsequentTicks(timestamp) {
        let duration = timestamp - this.previousTimestamp;
        if (duration >= this.time - this.remainder) {
            this.run(duration);
            this.remainder += duration - this.time;
            this.previousTimestamp = timestamp;
        }
    }
}