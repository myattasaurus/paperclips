import { Button, DisplayInt, DisplayMoney } from "../common/Display.js";
import { Interval } from "../common/Interval.js";
import { div, h3, hr, br } from "../common/elements.js";
import { Game } from "../model/Game.js";
import { GameObject } from "./GameObject.js";

export class Business extends GameObject {

    constructor(state) {
        super(state);
        this.funds = new DisplayMoney(this.state.funds);
        this.price = new DisplayMoney(this.state.price);
        this.unsold = new DisplayInt(this.state.unsold);
        this.marketDemand = new DisplayInt(this.state.marketDemand);

        this.lowerButton = new Button('lower', () => this.#lowerPrice());
        this.raiseButton = new Button('raise', () => this.#raisePrice());

        this.sellInterval = new Interval(100, (info) => this.#sell(info.cycles));

        this.update = (timestamp) => {
            if (this.paperclips.count >= this.state.showWhenClipsReach) {
                this.state.show = true;
                this.update = this.#update;
            }
        };
    }

    #lowerPrice() {
        this.state.price--;
        this.#updateMarketDemand();
    }

    #raisePrice() {
        this.state.price++;
        this.#updateMarketDemand();
    }

    #updateMarketDemand() {
        this.state.marketDemand = 80 / this.state.price;
    }

    #sell(cycles) {
        for (let i = 0; i < cycles && this.state.unsold >= 1; ++i) {
            if (Math.random() < (this.state.marketDemand / 100)) {
                let clipsToSell = 0.7 * Math.pow(this.state.marketDemand, 1.15);
                clipsToSell = Math.floor(Math.min(this.state.unsold, clipsToSell));
                this.state.funds += clipsToSell * this.state.price;
                this.state.unsold -= clipsToSell;
            }
        }
    }

    #update(timestamp) {
        this.sellInterval.tick(timestamp);
    }

    draw() {
        this.funds.value = this.state.funds;
        this.price.value = this.state.price;
        this.unsold.value = Math.floor(this.state.unsold);
        this.marketDemand.value = Math.floor(this.state.marketDemand * 10);
    }

    show() {
        let bus = div('business');

        bus.append(h3('Business'));
        bus.append(hr());

        bus.append('Available funds: ', this.funds.element, br());
        bus.append('Unsold inventory: ', this.unsold.element, br());
        bus.append(this.lowerButton.element, this.raiseButton.element, ' Price per clip: ', this.price.element, br());
        bus.append('Public demand: ', this.marketDemand.element, '%', br());
    }

    save(state) {
        state.business = this.state;
    }

    load(state) {
        this.state = state.business;
        this.paperclips = state.paperclips;
    }
}