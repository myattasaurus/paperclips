import { Game } from './game/Game.js';
import { Controller } from './controller/Controller.js';
import { State } from './model/State.js';

let devInit = {
    business: {
        funds: 1000000000
    },
    wire: {
        purchaseLength: 100000,
        cost: 100
    },
    autoclippers: {
        count: 0
    }
}

let init = {
    business: {
        funds: 0
    },
    wire: {
        purchaseLength: 1000,
        cost: 1500
    },
    autoclippers: {
        count: 0
    }
}

let dev = {
    manualclipper: {
        clipsCreated: 0,
    },
    business: {
        showWhenClipsReach: 2,
        funds: 0,
        price: 25,
        sold: 0,
        marketDemand: 100,
    },
    manufacturing: {
        showWhenFundsReach: 300,
    }
}

// let game = new Game(devInit);
// game.show();

new Controller(new State(dev));
