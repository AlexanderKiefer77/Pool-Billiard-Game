import { COLORS } from "../scripts/setupBalls.js";
import { Controller } from "../models/controller.class.js";
import { drawCloth, drawWood } from "../scripts/table.js";


export class Game {
    constructor({ balls, pockets }) {
        this.balls = balls;
        this.pockets = pockets;
        this.won = null;
        this.playing = true;
        this.idle = true;
        this.whiteBall = this.balls.find(b => b.color == COLORS.WHITE);
        this.blackBall = this.balls.find(b => b.color == COLORS.BLACK);
        this.controller = new Controller(this.whiteBall);
        this.enableRestart();
    }

    enableRestart() {
        document.getElementById("restartBtn").addEventListener("click", () => {
            this.restart();
        })
    }

    draw() {
        drawCloth(); // Tischtuch zeichnen
        drawWood(); // Rand vom Tisch zeichnen
        this.pockets.forEach((p) => p.draw());
        this.balls.forEach(b => b.draw());
        this.controller.draw();
    }

    update() {
        if (!this.playing) return;
        this.balls.forEach((b) => b.update(this));
        this.controller.update();
        this.idle = this.balls.every(b => b.idle || b.inPocket);
        if (this.idle) {
            this.controller.active = true;
            if (this.blackBall.inPocket) {
                // window.alert("Black ball is in Pocket");
                this.finish();
            } else if (this.whiteBall.inPocket) {
                this.whiteBall.reset(this);
            }
        }
    }

    finish() {
        this.playing = false;
        this.controller.active = false;
        this.won = !this.whiteBall.inPocket && this.balls.every(ball => ball == this.whiteBall || ball.inPocket);
        if (this.won) {
            window.alert("You won the game !")
        } else {
            window.alert("You lost the game !")
        }
    }

    restart() { // für Restart Button
        this.balls.forEach(b => b.reset(this));
        this.won = null;
        this.idle = true;
        this.playing = true;
    }
}