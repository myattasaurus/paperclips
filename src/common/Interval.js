export class Interval {

    #GAME_INTERVAL = 16 + (2 / 3);

    #previousTimestamp = 0;
    #frequency;

    constructor(frequency, update = (m) => { }) {
        this.frequency = frequency;
        this.update = update;
    }

    run(timestamp) {
        let millisSinceLastInterval = timestamp - this.#previousTimestamp;
        if (millisSinceLastInterval > this.frequency) {
            this.update(millisSinceLastInterval);
            this.#previousTimestamp = timestamp;
        }
    }

    get frequency() {
        return this.#frequency;
    }

    set frequency(frequency) {
        this.#frequency = Math.max(frequency, this.#GAME_INTERVAL);
    }
}