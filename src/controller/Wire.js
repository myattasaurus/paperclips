import { DisplayInt, DisplayMoney, Button } from "../common/Display.js";
import { div, br } from "../common/elements.js";
import { Interval } from "../common/Interval.js";
import { GameObject } from "./GameObject.js";

export class Wire extends GameObject {

    constructor(state) {
        super(state);
        this.inches = new DisplayInt(this.state.inches);
        this.cost = new DisplayMoney(this.state.cost);
        this.button = new Button('Wire', () => this.purchase());

        this.priceFluctuation = new Interval(this.state.price.maxChangeTime, () => this.adjustPrice());

        this.intervals = [
            this.priceFluctuation
        ];
    }

    purchase() {
        if (this.business.funds >= this.state.cost) {
            this.business.funds -= this.state.cost;
            this.state.inches += this.state.purchaseLength;
        }
    }

    adjustPrice() {
        let price = this.state.price;
        let changeTimeRange = price.maxChangeTime - price.minChangeTime;
        this.priceFluctuation.time = Math.random() * changeTimeRange + price.minChangeTime;

        let previousCost = this.state.cost;
        let halfRange = (price.upperBound + 1 - price.lowerBound) / 2;
        for (let i = 0; i < 100 && this.state.cost === previousCost; i++) {

            let valuesFromNegative1ToPositive1 = Math.sin(Math.random() * 2 * Math.PI);
            let valuesFromNegative6ToPositive6 = halfRange * valuesFromNegative1ToPositive1;
            let valuesFrom0To12 = valuesFromNegative6ToPositive6 + halfRange;
            let valuesFrom15To27 = valuesFrom0To12 + price.lowerBound;

            this.state.cost = Math.floor(valuesFrom15To27) * 100;
        }

    }

    draw() {
        this.button.enabled = this.business.funds >= this.state.cost;
        this.inches.value = Math.ceil(this.state.inches);
        this.cost.value = this.state.cost;
    }

    show() {
        let mfc = div('wire');

        mfc.append(this.button.element, ' ', this.inches.element, ' inches', br());
        mfc.append('Cost: ', this.cost.element, br(), br());
    }

    save(state) {
        state.manufacturing.wire = this.state;
    }

    load(state) {
        this.state = state.manufacturing.wire;
        this.business = state.business;
    }
}