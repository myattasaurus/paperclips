import { DisplayInt } from "../../common/Display.js";
import { Interval } from "../../common/Interval.js";

export class Market {
    constructor(business) {
        this.demand = new DisplayInt(100);
        this.interval = new Interval(500, () => {
            if (Math.random() * 100 <= this.demand.value) {
                business.sell();
            }
        });
    }
}