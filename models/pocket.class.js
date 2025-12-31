import { tctx } from "../scripts/canvas.js";
import { distance } from "../scripts/math.js";

export const pocketSize = 30;

export class Pocket {
    constructor({ pos }) {
        this.pos = pos;
        this.size = pocketSize;
        this.color = "#000";
        this.gradient = tctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            this.size
        );
        this.gradient.addColorStop(0.4, "#202020");
        this.gradient.addColorStop(1, "#000");
    }

    draw() {
        tctx.save();
        tctx.shadowBlur = 10;
        tctx.shadowColor = "#000";
        tctx.translate(this.pos.x, this.pos.y);
        tctx.fillStyle = this.gradient; // Farbe Pocket
        tctx.beginPath();
        tctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        tctx.fill();
        tctx.closePath();
        tctx.restore();
    }

    includes(ball) {
        return distance(this.pos, ball.pos) <= this.size;
    }
}
