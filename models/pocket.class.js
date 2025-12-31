import { ctx } from "../scripts/canvas.js";
import { distance } from "../scripts/math.js";

export const pocketSize = 30;

export class Pocket {
    constructor({ pos }) {
        this.pos = pos;
        this.size = pocketSize;
        this.color = "#000";
        this.gradient = ctx.createRadialGradient(
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
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#000";
        ctx.translate(this.pos.x, this.pos.y);
        ctx.fillStyle = this.gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    includes(ball) {
        return distance(this.pos, ball.pos) <= this.size;
    }
}
