import { Frame } from "./src/common/Frame.js";

class Paperclip {
    static #TWO_PI = 2 * Math.PI;
    static #HALF_PI = Math.PI / 2;
    static #THREE_HALF_PI = 3 * this.#HALF_PI;

    constructor() {
        this.height = 8;
        this.length = {
            inner: {
                top: 12,
                bottom: 15
            },
            outer: {
                top: 18,
                bottom: 17
            }
        };

        this.rotation = {
            perSecond: 3,
            radians: 0
        };

        this.x = 200;
        this.y = 200;

        this.dxPerSecond = 400;
        this.dyPerSecond = -1000;
        this.ddyPerSecond = 4000;

        this.frame = new Frame((d) => this.#update(d));
    }

    update(timestamp) {
        this.frame.tick(timestamp);
    }

    #update(duration) {
        let seconds = duration / 1000;
        let rotations = this.rotation.perSecond * seconds * Paperclip.#TWO_PI;
        this.rotation.radians = (this.rotation.radians + rotations) % Paperclip.#TWO_PI;

        this.x += this.dxPerSecond * seconds;
        this.y += this.dyPerSecond * seconds;

        this.dyPerSecond += this.ddyPerSecond * seconds;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation.radians);
        ctx.translate(-this.x, -this.y);
        this.draw2(ctx);
        ctx.restore();
    }

    draw2(ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'gray';

        let height = this.height;
        let bottomOuterLength = this.length.outer.bottom;
        let topOuterLength = this.length.outer.top;
        let bottomInnerLength = this.length.inner.bottom;
        let topInnerLength = this.length.inner.top;

        let x = this.x;
        let y = this.y;

        ctx.beginPath();

        // locate starting point from center (tip of bottom outer length)
        let width = height - 1 + topOuterLength;
        let radius = height / 2;
        x += radius + bottomOuterLength - width / 2;
        y += height / 2;
        ctx.moveTo(x, y);

        x -= bottomOuterLength;
        ctx.lineTo(x, y);

        let centerX = x;
        let centerY = y - radius;
        ctx.arc(centerX, centerY, radius, Paperclip.#HALF_PI, Paperclip.#THREE_HALF_PI, false);

        x += topOuterLength;
        y -= height;
        ctx.lineTo(x, y);

        radius -= ctx.lineWidth;
        centerX = x;
        centerY = y + radius;
        ctx.arc(centerX, centerY, radius, Paperclip.#THREE_HALF_PI, Paperclip.#HALF_PI, false);

        x -= bottomInnerLength;
        y += 2 * radius;
        ctx.lineTo(x, y);

        radius -= ctx.lineWidth;
        centerX = x;
        centerY = y - radius;
        ctx.arc(centerX, centerY, radius, Paperclip.#HALF_PI, Paperclip.#THREE_HALF_PI, false);

        x += topInnerLength;
        y -= 2 * radius;
        ctx.lineTo(x, y);

        ctx.stroke();
    }
}

let paperclip = new Paperclip();
onLoad();

function onLoad() {
    requestAnimationFrame(loop);
}

function loop(timestamp) {
    paperclip.update(timestamp);

    let canvas = document.getElementById('canvas');
    let bodyRect = document.getElementsByTagName('body')[0].getBoundingClientRect();
    canvas.setAttribute('height', bodyRect.height);
    canvas.setAttribute('width', bodyRect.width);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        paperclip.draw(ctx);
    }
    requestAnimationFrame(loop);
}

let paperclip8 = {
    height: 8,
    bottomOuterLength: 17,
    topOuterLength: 18,
    bottomInnerLength: 15,
    topInnerLength: 12
};

let paperclip7 = {
    height: 7,
    bottomOuterLength: 15,
    topOuterLength: 16,
    bottomInnerLength: 13,
    topInnerLength: 11
};