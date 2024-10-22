import { Canvas } from "../common/Canvas.js";
import { Game } from "../model/Game.js";
import { Autoclippers } from "./Autoclippers.js";
import { Business } from "./Business.js";
import { ClipsPerSecond } from "./ClipsPerSecond.js";
import { Manufacturing } from "./Manufacturing.js";
import { PaperclipImages, Paperclips } from "./Paperclips.js";
import { Wire } from "./Wire.js";

export class Controller {
    constructor() {
        this.canvas = new Canvas(document.getElementById('canvas'));

        let paperclipImages = new PaperclipImages(this.canvas);

        this.objects = [
            new Paperclips(Game.state, paperclipImages),
            paperclipImages,
            new Business(Game.state),
            new Manufacturing(Game.state),
            new ClipsPerSecond(Game.state),
            new Wire(Game.state),
            new Autoclippers(Game.state),
        ];

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    gameLoop(timestamp) {
        for (let drawable of this.objects) {
            if (drawable.state && drawable.state.show) {
                drawable.show();
                drawable.state.show = undefined;
            }
        }
        for (let drawable of this.objects) {
            drawable.update(timestamp);
        }

        this.canvas.clear();
        let ctx = this.canvas.context;
        for (let drawable of this.objects) {
            ctx.save();
            drawable.draw(ctx);
            ctx.restore();
        }
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    save() {
        for (let drawable of this.objects) {
            drawable.save(Game.state);
        }
        Game.save();
    }

    load() {
        Game.load();
        for (let drawable of this.objects) {
            drawable.load(Game.state);
        }
    }
}