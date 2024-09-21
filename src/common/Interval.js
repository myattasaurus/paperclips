export class Interval {

    #id = -1;

    #base = 1000;
    #min = 10;

    constructor(callback) {
        this.callback = callback;
    }

    start(count, callback) {
        let interval = Math.max(this.#min, this.#base / count);
        this.#id = setInterval(callback, interval);
    }

    update(count, callback) {
        clearInterval(this.#id);
        this.start(count, callback);
    }
}