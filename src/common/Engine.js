let GAME_INTERVAL = 16 + (2 / 3);

export class Engine {

    #intervals = [];
    #everyFrame = [];

    constructor() {
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(timestamp) {
        for (let interval of this.#intervals) {
            interval.run(timestamp);
        }
        for (let action of this.#everyFrame) {
            action();
        }
        requestAnimationFrame((t) => this.loop(t));
    }

    add(interval) {
        this.#intervals.push(interval);
    }

    onEveryFrame(action) {
        this.#everyFrame.push(action);
    }

}