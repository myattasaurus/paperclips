import { Canvas } from "./src/common/Canvas.js";
import { Frame } from "./src/common/Frame.js";

class Paperclip {
    static #TWO_PI = 2 * Math.PI;
    static #HALF_PI = Math.PI / 2;
    static #THREE_HALF_PI = 3 * this.#HALF_PI;

    static MAX_ROTATIONS_PER_SECOND = 6;
    static MAX_DX = 500;
    static MAX_DY = -1000;

    constructor(overwriteDefaults = {}) {
        this.height = 8;

        this.topInnerLength = 12;
        this.bottomInnerLength = 15;
        this.topOuterLength = 18;
        this.bottomOuterLength = 17;

        this.rotationsPerSecond = 1;
        this.radians = 0;

        this.x = 200;
        this.y = 200;

        this.dxPerSecond = 400;
        this.dyPerSecond = -1000;
        this.ddyPerSecond = 4000;

        for (let key of Object.keys(overwriteDefaults)) {
            this[key] = overwriteDefaults[key];
        }

        this.frame = new Frame((d) => this.#update(d));
    }

    update(timestamp) {
        this.frame.tick(timestamp);
    }

    #update(duration) {
        let seconds = duration / 1000;
        let rotations = this.rotationsPerSecond * seconds * Paperclip.#TWO_PI;
        this.radians = (this.radians + rotations) % Paperclip.#TWO_PI;

        this.x += this.dxPerSecond * seconds;
        this.y += this.dyPerSecond * seconds;

        this.dyPerSecond += this.ddyPerSecond * seconds;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.radians);
        ctx.translate(-this.x, -this.y);
        this.draw2(ctx);
        ctx.restore();
    }

    draw2(ctx) {
        let height = this.height;

        let x = this.x;
        let y = this.y;

        ctx.beginPath();

        // locate starting point from center (tip of bottom outer length)
        let width = height - 1 + this.topOuterLength;
        let radius = height / 2;
        x += radius + this.bottomOuterLength - width / 2;
        y += height / 2;
        ctx.moveTo(x, y);

        x -= this.bottomOuterLength;
        ctx.lineTo(x, y);

        let centerX = x;
        let centerY = y - radius;
        ctx.arc(centerX, centerY, radius, Paperclip.#HALF_PI, Paperclip.#THREE_HALF_PI, false);

        x += this.topOuterLength;
        y -= height;
        ctx.lineTo(x, y);

        radius -= ctx.lineWidth;
        centerX = x;
        centerY = y + radius;
        ctx.arc(centerX, centerY, radius, Paperclip.#THREE_HALF_PI, Paperclip.#HALF_PI, false);

        x -= this.bottomInnerLength;
        y += 2 * radius;
        ctx.lineTo(x, y);

        radius -= ctx.lineWidth;
        centerX = x;
        centerY = y - radius;
        ctx.arc(centerX, centerY, radius, Paperclip.#HALF_PI, Paperclip.#THREE_HALF_PI, false);

        x += this.topInnerLength;
        y -= 2 * radius;
        ctx.lineTo(x, y);

        ctx.stroke();
    }
}

export class PaperclipImages {
    constructor(canvas) {
        this.paperclips = [];
        this.canvas = canvas;
    }

    spawn() {
        this.paperclips.push(new Paperclip({
            dxPerSecond: Math.round(Math.random() * Paperclip.MAX_DX),
            dyPerSecond: Math.round(Math.random() * Paperclip.MAX_DY),
            rotationsPerSecond: Math.random() * 2 * Paperclip.MAX_ROTATIONS_PER_SECOND - Paperclip.MAX_ROTATIONS_PER_SECOND,
            radians: Math.random() * 2 * Math.PI,
        }));
    }

    despawn(paperclip) {
        let index = this.paperclips.indexOf(paperclip);
        if (index > -1) {
            this.paperclips.splice(index, 1);
        }
    }

    update(timestamp) {
        for (let paperclip of this.paperclips) {
            paperclip.update(timestamp);
            if (paperclip.x > canvas.width + 50 || paperclip.y > canvas.height + 50) {
                this.despawn(paperclip);
            }
        }
    }

    draw(ctx) {

        ctx.lineCap = 'round';
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'gray';
        ctx.save();

        for (let paperclip of this.paperclips) {
            paperclip.draw(ctx);
        }
        ctx.restore();
    }
}

let canvas = new Canvas(document.getElementById('canvas'));
let paperclips = new PaperclipImages(canvas);
document.getElementById('spawnButton').onclick = () => paperclips.spawn();
requestAnimationFrame(loop);

function loop(timestamp) {
    paperclips.update(timestamp);

    canvas.clear();
    let ctx = canvas.context;
    ctx.save();
    paperclips.draw(ctx);
    ctx.restore();
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