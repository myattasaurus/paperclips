import { Canvas } from "../common/Canvas.js";
import { Game } from "../model/Game.js";
import { Autoclippers } from "./Autoclippers.js";
import { Business } from "./Business.js";
import { ClipsPerSecond } from "./ClipsPerSecond.js";
import { Manufacturing } from "./Manufacturing.js";
import { PaperclipImages, Paperclips } from "./Paperclips.js";
import { Wire } from "./Wire.js";

export class Controller {

    #animationId = 0;

    constructor() {
        this.canvas = new Canvas(document.getElementById('canvas'));

        let paperclipImages = new PaperclipImages(this.canvas);
        let paperclips = new Paperclips(Game.state, paperclipImages);

        let business = new Business(Game.state);

        let clipsPerSecond = new ClipsPerSecond(Game.state);
        let wire = new Wire(Game.state);
        let autoclippers = new Autoclippers(Game.state);
        let manufacturing = new Manufacturing(Game.state, clipsPerSecond, wire, autoclippers);

        this.sections = [
            paperclips,
            business,
            manufacturing,
        ];

        this.objects = [
            paperclips,
            paperclipImages,
            business,
            clipsPerSecond,
            wire,
            autoclippers,
        ];

        this.paintings = [
            paperclipImages,
        ]

        this.#animationId = requestAnimationFrame((t) => this.gameLoop(t));
    }

    gameLoop(timestamp) {
        for (let i = this.sections.length - 1; i >= 0; i--) {
            if (this.sections[i].show()) {
                this.sections.splice(i, 1);
            }
        }
        for (let object of this.objects) {
            if (object.intervals) {
                for (let interval of object.intervals) {
                    interval.tick(timestamp);
                }
            }
        }
        for (let object of this.objects) {
            if (object.draw) {
                object.draw();
            }
        }

        this.canvas.clear();
        let ctx = this.canvas.context;
        for (let painting of this.paintings) {
            ctx.save();
            painting.paint(ctx);
            ctx.restore();
        }

        this.#animationId = requestAnimationFrame((t) => this.gameLoop(t));
    }

    save() {
        cancelAnimationFrame(this.#animationId);
        for (let object of this.objects) {
            object.save(Game.state);
        }
        Game.save();
    }

    load() {
        Game.load();
        for (let object of this.objects) {
            object.load(Game.state);
        }
        this.#animationId = requestAnimationFrame((t) => this.gameLoop(t));
    }
}