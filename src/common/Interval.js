export class Interval {

    constructor(time, run = (info) => { }, runOnVisible = run) {
        this.time = time;
        this.run = run;
        this.runOnVisible = runOnVisible;

        this.remainder = 0;
        this.previousTimestamp = 0;
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
        if (duration >= this.time - this.remainder) {
            this.remainder += duration;
            let info = {
                cycles: Math.floor(this.remainder / this.time),
                duration: duration
            };
            this.remainder %= this.time;
            this.previousTimestamp = timestamp;
            fcn(info);
        }
    }
}