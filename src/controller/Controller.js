import { Business } from "./Business.js";
import { Paperclips } from "./Paperclips.js";

export class Controller {
    constructor(game) {
        this.game = game;

        this.drawables = [
            new Paperclips(game.paperclips, game.manualclipper, game.business),
            new Business(game.business),
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