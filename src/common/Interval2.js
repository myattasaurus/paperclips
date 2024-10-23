export class Interval2 {

    constructor(state, run = (info) => { }, runOnVisible = run) {
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

    save(state) {
        state.time = this.time;
        state.remainder = this.remainder;
        state.previousTimestamp = this.previousTimestamp;
    }

    load(state) {
        this.time = state.time;
        this.remainder = state.remainder ? state.remainder : 0;
        this.previousTimestamp = state.previousTimestamp ? state.previousTimestamp : 0;
    }
}