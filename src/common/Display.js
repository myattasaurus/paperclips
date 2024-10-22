import { Rect } from "./Rect.js";

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
        let str = this.toString();
        if (str != this.element.innerHTML) {
            this.element.innerHTML = str;
        }
    }

    toString() {
        return commas(this.#value);
    }
}

export class DisplayMoney extends DisplayInt {
    constructor(value) {
        super(value);
    }

    toString() {
        let dollars = commas(Math.floor(this.value / 100));
        let cents = Math.floor(this.value % 100);
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

    set enabled(enabled) {
        this.element.disabled = !enabled;
    }

    get rect() {
        return new Rect(this.element.getBoundingClientRect());
    }
}

function commas(number) {
    let str = number.toString();
    let formatted = '';
    while (str.length > 3) {
        let back3Digits = str.substring(str.length - 3);
        formatted = ',' + back3Digits + formatted;
        str = str.substring(0, str.length - 3);
    }
    formatted = str + formatted;
    return formatted;
}