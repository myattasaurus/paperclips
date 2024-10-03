import { Business } from "./Business.js";
import { Manufacturing } from "./Manufacturing.js";
import { Paperclips } from "./Paperclips.js";
import { Wire } from "./Wire.js";

export class Controller {
    constructor(game) {
        this.game = game;

        this.drawables = [
            new Paperclips(game.paperclips, game.manualclipper, game.business, game.manufacturing.wire),
            new Business(game.business, game.manualclipper),
            new Manufacturing(game.manufacturing, game.business),
            new Wire(game.manufacturing.wire, game.business),
        ];

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    gameLoop(timestamp) {
        for (let drawable of this.drawables) {
            if (drawable.state.show) {
                drawable.show();
                drawable.state.show = undefined;
            }
            drawable.update(timestamp);
            drawable.draw();
        }
        requestAnimationFrame((t) => this.gameLoop(t));
    }
}