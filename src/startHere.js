import { Controller } from "./controller/Controller.js";

let dev = {
    paperclips: {
        count: 0,
    },
    business: {
        showWhenClipsReach: 10,
        funds: 0,
        price: 25,
        unsold: 0,
        marketDemand: 32,
    },
    manufacturing: {
        showWhenFundsReach: 300,
        clipsPerSecond: {
            count: 0
        },
        wire: {
            purchaseLength: 1000,
            cost: 100,
            inches: 1000,
        },
        autoclippers: {
            count: 0,
            cost: 500
        }
    }
}

new Controller(dev);
