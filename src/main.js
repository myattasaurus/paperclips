import { Game } from '/src/game/Game.js'


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

export const game = new Game(devInit);
game.show();