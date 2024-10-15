export class Canvas {
    constructor(element) {
        this.element = element;
        this.onResize();
        this.element.parentElement.onresize = () => this.onResize();
    }

    onResize() {
        let parentRect = this.element.parentElement.getBoundingClientRect();
        this.height = parentRect.height;
        this.width = parentRect.width;
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    get context() {
        return this.element.getContext('2d');
    }

    get height() {
        return Number(this.element.getAttribute('height'));
    }

    set height(height) {
        this.element.setAttribute('height', height);
    }

    get width() {
        return Number(this.element.getAttribute('width'));
    }

    set width(width) {
        this.element.setAttribute('width', width);
    }
}