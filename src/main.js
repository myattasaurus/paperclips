import { Controller } from "./controller/Controller.js";

let dev = {
    paperclips: {
        count: 0,
    },
    business: {
        showWhenClipsReach: 2,
        funds: 0,
        price: 1000,
        unsold: 0,
        marketDemand: 100,
    },
    manufacturing: {
        showWhenFundsReach: 300,
        clipsPerSecond: {
            count: 0
        },
        wire: {
            purchaseLength: 1000,
            cost: 100,
            inches: 10000000,
        },
        autoclippers: {
            count: 0,
            cost: 500
        }
    }
}

new Controller(dev);
