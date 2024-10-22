import { Controller } from "./controller/Controller.js";
import { Game } from "./model/Game.js";

document.onvisibilitychange = () => {
    if (document.visibilityState !== 'visible') {
        Game.save();
    } else {
        Game.load();
    }
}

Game.load();
new Controller();
