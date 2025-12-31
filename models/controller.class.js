import { ctx, canvasNorm } from "../scripts/canvas.js";
import { mouse } from "../scripts/mouse.js";
import { sub, normalize, scale, limit, norm } from "../scripts/math.js";
import { SOUND } from "../scripts/sound.js";

export class Controller {
    constructor(ball) {
        this.ball = ball;
        this.vector = { x: 0, y: 0 };
        this.addControl();
        this.active = true;
        this.maxLength = 300;
    }

    addControl() {
        document.addEventListener("click", (e) => {
            if (e.target.nodeName == "BUTTON" || !this.active) return;
            this.active = false;
            const factor = 0.15;
            this.ball.vel = scale(factor, this.vector);
            // play sound, abhhängig von Geschwindigkeit
            const speed = norm(factor, this.vector);
            const volume = Math.min(1, speed / (factor * this.maxLength));          
            // SOUND.CUE.volume = volume;  // aus Tutorial-funktioniert aber so nicht
            SOUND.CUE.volume = 0.3;
            SOUND.CUE.play();
        })
    }

    update() {
        this.vector = limit(this.maxLength, sub(mouse, this.ball.pos));
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        // thick line
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.translate(this.ball.pos.x, this.ball.pos.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.vector.x, this.vector.y);
        ctx.stroke();
        ctx.closePath();
        // thin line
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const targetFar = scale(canvasNorm, normalize(this.vector));
        ctx.lineTo(targetFar.x, targetFar.y);
        ctx.stroke();
        ctx.restore();
    }
}