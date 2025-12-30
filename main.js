import { Game } from "./models/game.class.js";
import { clearCanvas } from "./scripts/canvas.js";
import { balls } from "./scripts/setupBalls.js";
import { pockets } from "./scripts/setupPockets.js";

const game = new Game({balls, pockets});

function loop() {
    clearCanvas();
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}

loop();
