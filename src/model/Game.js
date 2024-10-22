export class Game {
    static state = {
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
                cost: 1500,
                price: {
                    lowerBound: 15,
                    upperBound: 27,
                    minChangeTime: 5000,
                    maxChangeTime: 9000,
                },
                inches: 1000,
            },
            autoclippers: {
                count: 0,
                cost: 500
            }
        }
    };

    static save() {
        console.log(document.visibilityState, Game.state);
        localStorage.setItem('state', JSON.stringify(Game.state));
    }

    static load() {
        if (localStorage.getItem('state')) {
            Game.state = JSON.parse(localStorage.getItem('state'));
            console.log(document.visibilityState, Game.state);
        }
    }

    static reset() {
        localStorage.removeItem('state');
    }
}