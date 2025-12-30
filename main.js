import { Game } from "./models/game.class.js";
import { Polygon } from "./models/polygon.class.js";
import { clearCanvas, ctx } from "./scripts/canvas.js";
import { openDialog } from "./scripts/dialog.js";
import { balls } from "./scripts/setupBalls.js";
import { pockets } from "./scripts/setupPockets.js";
import { bumpers } from "./scripts/setupBumpers.js";

const game = new Game({ balls, pockets, bumpers });

// in setupBumpers.js verschoben
// const polygon = new Polygon({
//     coords: [
//         { x: 400, y: 200 },
//         { x: 600, y: 200 },
//         { x: 500, y: 400 },
//         { x: 400, y: 200 }
//     ],
// });

function loop() {
    clearCanvas();
    game.update();
    game.draw();
    //polygon.draw();

    // Zwischenschritt zum ausloggen
    // const segment = polygon.intersectionSegment(game.whiteBall);
    // if (segment) {
    //     console.log(JSON.stringify(segment));
    // };

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
