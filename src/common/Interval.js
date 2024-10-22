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
        let duration = timestamp - this.previousTimestamp;
        if (duration >= this.time - this.remainder) {
            this.remainder += duration;
            let info = {
                cycles: Math.floor(this.remainder / this.time),
                duration: duration
            };
            this.remainder %= this.time;
            this.previousTimestamp = timestamp;
            this.run(info);
        }
    }
}