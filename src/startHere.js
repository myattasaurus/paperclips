import { Controller } from "./controller/Controller.js";
import { Game } from "./model/Game.js";

let controller;

document.onvisibilitychange = () => {
    if (document.visibilityState !== 'visible') {
        controller.save();
    } else {
        controller.load();
    }
}

Game.load();
controller = new Controller();
