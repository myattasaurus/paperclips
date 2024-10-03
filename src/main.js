import { Game } from './game/Game.js';
import { Controller } from './controller/Controller.js';

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
    state: {
        manualclipper: {
            clipsCreated: 0
        },
    },
    view: {
        paperclips: {},
        business: {
            showWhenClipsReach: 2
        },
    }
}

// let game = new Game(devInit);
// game.show();

new Controller(dev);
