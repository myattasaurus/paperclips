import { Paperclips } from "./Paperclips.js";

export class Controller {
    constructor(game) {
        this.game = game;

        this.drawables = [
            new Paperclips(game.view.paperclips, game.state.manualclipper, game.view.business),
        ];

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    gameLoop(timestamp) {
        for (let drawable of this.drawables) {
            if (drawable.view.show) {
                drawable.show();
                drawable.view.show = undefined;
            }
            drawable.update(timestamp);
            drawable.draw();
        }
        requestAnimationFrame((t) => this.gameLoop(t));
    }
}