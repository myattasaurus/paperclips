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
        return commas(Math.floor(this.#value));
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
}

export class Paperclip {
    constructor(button) {
        this.element = document.createElement('img');
        this.element.setAttribute('src', 'paperclip.svg');

        let style = this.element.style;
        style.position = 'absolute';

        let rect = button.getBoundingClientRect();
        let height = rect.height * 0.4;

        style.top = rect.bottom - height + 'px';
        style.left = rect.right + rect.height + 'px';
        style.height = height + 'px';
    }

    async animate() {
        document.getElementsByTagName('body')[0].append(this.element);

        await this.element.animate([{
            transform: 'translateY(-' + 30 + 'px)',
            easing: 'ease-out',
            offset: 0.7
        }], 500).finished;

        this.element.remove();
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