export class Game {
    static state;

    static init() {
        Game.state = {
            paperclips: {
                count: 0,
            },
            business: {
                showWhenClipsReach: 10,
                funds: 0,
                price: 25,
                unsold: 0,
                marketDemand: 3.2,
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
                    baseCost: 500,
                    cost: 500
                }
            }
        };
    }

    static save() {
        localStorage.setItem('state', JSON.stringify(Game.state));
    }

    static load() {
        if (localStorage.getItem('state')) {
            Game.state = JSON.parse(localStorage.getItem('state'));
        } else {
            Game.init();
        }
    }

    static reset() {
        localStorage.removeItem('state');
        Game.init();
    }
}