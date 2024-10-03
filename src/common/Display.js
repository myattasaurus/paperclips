export class DisplayInt {

    #value;

    constructor(value) {
        this.element = document.createElement('span');
        this.value = value;
    }

    get value() {
        return this.#value;
    }

    set value(text) {
        this.#value = text;
        this.element.innerHTML = this.toString();
    }

    toString() {
        return Math.floor(this.#value);
    }
}

export class DisplayMoney extends DisplayInt {
    constructor(value) {
        super(value);
    }

    toString() {
        let dollars = Math.floor(this.value / 100);
        let cents = this.value % 100;
        return `$${dollars}.${cents < 10 ? '0' : ''}${cents}`;
    }
}

export class Button {
    constructor(text, onclick) {
        this.element = document.createElement('button');
        this.element.innerHTML = text;
        if (onclick) {
            this.onclick = onclick;
        }
    }

    get onclick() {
        return this.element.onclick;
    }

    set onclick(onclick) {
        this.element.onclick = onclick;
    }
}