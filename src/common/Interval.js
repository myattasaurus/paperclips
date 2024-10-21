export class Interval {

    constructor(time, run = (duration) => { }) {
        this.time = time;
        this.run = run;

        this.remainder = 0;
        this.previousTimestamp = 0;
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
            this.remainder += duration - this.time;
            this.previousTimestamp = timestamp;
            this.run(duration);
        }
    }
}