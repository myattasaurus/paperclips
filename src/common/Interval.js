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
            let info = {
                cycles: Math.floor(this.remainder / this.time),
                duration: this.remainder
            };
            this.remainder %= this.time;
            this.run(info);
        }
    }
}