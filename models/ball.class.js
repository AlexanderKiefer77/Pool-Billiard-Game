import { canvas, ctx, margin } from "../scripts/canvas.js";

export class Ball {
    constructor({ pos, color, vel }) {
        this.pos = pos;
        this.color = color;
        this.vel = vel ?? { x: 0, y: 0 }; // Geschwindigkeit
        this.size = 18;
        this.friction = 0.99; // Reibung
    }

    get idle() { // für Ball bewegt sich nicht mehr
        return this.vel.x == 0 && this.vel.y == 0;
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
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;
        this.bounceOfWalls();
        this.handleTinyVelocities();
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

    handleTinyVelocities() {
        const treshold = 0.04; // Grenzwert für Bewegung des Ball´s. Wert nicht zu klein oder zu groß, muss entsprechend der Bewegung festgelegt werden.
        if (Math.abs(this.vel.x) < treshold) {
            this.vel.x = 0; // wenn Bewegung kleiner als 0.04 ist, wird die Bewegung auf 0 gesetzt.
        }
        if (Math.abs(this.vel.y) < treshold) {
            this.vel.y = 0;
        }
    }
}