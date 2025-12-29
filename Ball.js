import { ctx } from "./canvas.js";

export class Ball {
    constructor({ pos, color, vel }) {
        this.pos = pos;
        this.color = color;
        this.vel = vel ?? { x: 0, y: 0 };
        this.size = 18;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}