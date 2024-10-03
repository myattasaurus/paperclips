export class Interval2 {
    constructor(time, run) {
        this.time = time;
        this.previousTimestamp = 0;
        this.remainder = 0;
        this.run = run;
        this.tick = this.#firstTick;
    }

    #firstTick(timestamp) {
        this.previousTimestamp = timestamp;
        this.tick = this.#subsequentTicks;
    }

    #subsequentTicks(timestamp) {
        let elapsed = timestamp - this.previousTimestamp;
        if (elapsed >= this.time - this.remainder) {
            this.run();
            this.remainder += elapsed - this.time;
            this.previousTimestamp = timestamp;
        }
    }
}