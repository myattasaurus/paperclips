import { Controller } from "./controller/Controller.js";
import { Game } from "./model/Game.js";

let controller;

document.onvisibilitychange = (event) => {
    if (document.visibilityState !== 'visible') {
        controller.save();
    } else {
        controller.load(event.timeStamp);
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

Game.load();
controller = new Controller();
