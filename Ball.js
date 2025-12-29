import { canvas, ctx, margin } from "./canvas.js";

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
        this.bounceOfWalls();
    }

    bounceOfWalls() { // wenn Ball an Bande anstösst
        // horizontal
        if (this.pos.x + this.size >= canvas.width - margin) {
            this.pos.x = canvas.width - margin - this.size;
            this.vel.x *= -1;
        } else if (this.pos.x - this.size <= margin) {
            this.pos.x = this.size + margin;
            this.vel.x *= -1;
        }

        // vertikal
        if (this.pos.y + this.size >= canvas.height - margin) {
            this.pos.y = canvas.height - margin - this.size;
            this.vel.y *= -1;
        } else if (this.pos.y - this.size <= margin) {
            this.pos.y = this.size + margin;
            this.vel.y *= -1;
        }
    }
}