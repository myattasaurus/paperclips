import { Canvas } from "../common/Canvas.js";
import { Autoclippers } from "./Autoclippers.js";
import { Business } from "./Business.js";
import { ClipsPerSecond } from "./ClipsPerSecond.js";
import { Manufacturing } from "./Manufacturing.js";
import { PaperclipImages, Paperclips } from "./Paperclips.js";
import { Wire } from "./Wire.js";

export class Controller {
    constructor(game) {
        this.game = game;
        this.canvas = new Canvas(document.getElementById('canvas'));

        let paperclipImages = new PaperclipImages(this.canvas);

        this.drawables = [
            new Paperclips(game.paperclips, game.business, game.manufacturing.wire, game.manufacturing.autoclippers, paperclipImages),
            paperclipImages,
            new Business(game.business, game.paperclips),
            new Manufacturing(game.manufacturing, game.business),
            new ClipsPerSecond(game.manufacturing.clipsPerSecond, game.paperclips),
            new Wire(game.manufacturing.wire, game.business),
            new Autoclippers(game.manufacturing.autoclippers, game.business),
        ];

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    gameLoop(timestamp) {
        for (let drawable of this.drawables) {
            if (drawable.state && drawable.state.show) {
                drawable.show();
                drawable.state.show = undefined;
            }
        }
        for (let drawable of this.drawables) {
            drawable.update(timestamp);
        }

        this.canvas.clear();
        let ctx = this.canvas.context;
        for (let drawable of this.drawables) {
            ctx.save();
            drawable.draw(ctx);
            ctx.restore();
        }
        requestAnimationFrame((t) => this.gameLoop(t));
    }
}