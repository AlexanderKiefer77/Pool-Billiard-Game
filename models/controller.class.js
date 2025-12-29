import { ctx, canvasNorm } from "../scripts/canvas.js";
import { mouse } from "../scripts/mouse.js";
import { sub, normalize, scale } from "../scripts/math.js";

export class Controller {
    constructor(ball) {
        this.ball = ball;
        this.vector = { x: 0, y: 0 };
        this.addControl();
        this.active = true;
    }

    addControl() {
        document.addEventListener("click", e => {
            if (!this.active) return;
            this.active = false;
            const factor = 0.15;
            this.ball.vel = scale(factor, this.vector);
            // this.ball.vel.x = factor * this.vector.x; // ersetzt mit Formel in math.js
            // this.ball.vel.y = factor * this.vector.y; // ersetzt mit Formel in math.js
        })
    }

    update() {
        this.vector = sub(mouse, this.ball.pos);
        // { // ersetzt mit Formel in math.js
        //     x: mouse.x - this.ball.pos.x,
        //     y: mouse.y - this.ball.pos.y,
        // }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        // thick line
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.translate(this.ball.pos.x, this.ball.pos.y); // in Zusammenhang mit math.js hinzugefügt
        ctx.beginPath();
        // ctx.moveTo(this.ball.pos.x, this.ball.pos.y); // ersetzt mit Formel in math.js
        ctx.moveTo(0, 0);
        // ctx.lineTo(mouse.x, mouse.y); // ersetzt mit Formel in math.js
        ctx.lineTo(this.vector.x, this.vector.y);
        ctx.stroke();
        ctx.closePath();
        // thin line
        ctx.lineWidth = 1;
        ctx.beginPath();
        // ctx.moveTo(this.ball.pos.x, this.ball.pos.y); // ersetzt mit Formel in math.js
        ctx.moveTo(0, 0);
        // const vectorLength = Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y); // in Zusammenhang mit mit math.js entfernt
        const targetFar = scale(canvasNorm, normalize(this.vector));  // in Zusammenhang mit math.js hinzugefügt
        // ctx.lineTo( // ersetzt mit Formel in math.js
        //     this.ball.pos.x + canvasNorm / vectorLength * this.vector.x,
        //     this.ball.pos.y + canvasNorm / vectorLength * this.vector.y);
        ctx.lineTo(targetFar.x, targetFar.y);
        ctx.stroke();
        ctx.restore();
    }
}