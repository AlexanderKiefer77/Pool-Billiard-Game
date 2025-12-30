import { Game } from "./models/game.class.js";
import { clearCanvas, ctx } from "./scripts/canvas.js";
import { openDialog } from "./scripts/dialog.js";
import { balls } from "./scripts/setupBalls.js";
import { pockets } from "./scripts/setupPockets.js";

const game = new Game({ balls, pockets });

function loop() {
    clearCanvas();
    game.update();
    game.draw();

    // zeichnet schattige Punkt auf Startpunkt vom whiteBall
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.arc(
        game.whiteBall.originalPos.x,
        game.whiteBall.originalPos.y,
        18,
        0,
        2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
    // zeichnet schattige Punkt auf Startpunkt vom whiteBall

    requestAnimationFrame(loop);
}

loop();

setTimeout(() => {
    openDialog("Use your mouse to control the white ball.<br>" +
        "Try to pocket every other ball with it.<br>" +
        "The black ball has to be the last one."
    );
}, 500);
