export class Interval {

    constructor(time, run = (count) => { }) {
        this.time = time;
        this.run = run;

        this.remainder = 0;
        this.previousTimestamp = 0;
        this.tick = this.#firstTick;
    }

    #firstTick(timestamp) {
        this.previousTimestamp = timestamp;
        this.tick = this.#subsequentTicks;
    }

    #subsequentTicks(timestamp) {
        this.remainder += timestamp - this.previousTimestamp;
        this.previousTimestamp = timestamp;
        if (this.remainder >= this.time) {
            let count = Math.floor(this.remainder / this.time);
            this.remainder %= this.time;
            this.run(count);
        }
    }
}