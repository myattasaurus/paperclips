export class Manufacturing {
    constructor(state, business) {
        this.state = state;
        this.business = business;

        this.update = this.#showIfApplicable;
    }

    #showIfApplicable(timestamp) {
        if (this.business.funds >= this.state.showWhenFundsReach) {
            this.state.show = true;
            this.state.wire.show = true;
            this.state.autoclippers.show = true;
            this.update = this.#update;
        }
    }

    #update(timestamp) {

    }

    draw() {

    }

    show() {
        let mfc = document.getElementById('manufacturing');

        let h3 = document.createElement('h3');
        h3.innerHTML = 'Manufacturing';
        mfc.append(h3);
        mfc.append(document.createElement('hr'));
    }
}