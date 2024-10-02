export class Interval {

    #previousTimestamp = 0;
    frequency;

    constructor(frequency, update = () => { }) {
        this.frequency = frequency;
        this.update = update;
    }

    run(timestamp) {
        if (timestamp - this.#previousTimestamp > this.frequency) {
            this.update();
            this.#previousTimestamp = timestamp;
        }
    }
}