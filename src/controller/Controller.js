import { Autoclippers } from "./Autoclippers.js";
import { Business } from "./Business.js";
import { Manufacturing } from "./Manufacturing.js";
import { Paperclips } from "./Paperclips.js";
import { Wire } from "./Wire.js";

export class Controller {
    constructor(game) {
        this.game = game;

        this.drawables = [
            new Paperclips(game.paperclips, game.business, game.manufacturing.wire, game.manufacturing.autoclippers),
            new Business(game.business, game.paperclips),
            new Manufacturing(game.manufacturing, game.business),
            new Wire(game.manufacturing.wire, game.business),
            new Autoclippers(game.manufacturing.autoclippers, game.business),
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