import { Controller } from "./controller/Controller.js";
import { Game } from "./model/Game.js";

Game.load();
let controller = new Controller();

document.onvisibilitychange = () => {
    if (document.visibilityState !== 'visible') {
        controller.save();
    } else {
        controller.load();
    }
}

document.getElementById('reset').onclick = () => {
    Game.reset();
    for (let div of document.querySelectorAll('div[id]')) {
        while (div.firstChild) {
            div.removeChild(div.lastChild);
        }
    }
    controller = new Controller();
};

