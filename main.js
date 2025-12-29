import { Ball } from "./scripts/Ball.js";
import { clearCanvas } from "./scripts/canvas.js";
import { balls } from "./scripts/setupBalls.js";
import { drawCloth, drawWood } from "./scripts/table.js";

// war Zwischenschritt, wurde gelöscht !
// const b = new Ball({
//     pos: { x: 400, y: 300 },
//     vel: { x: 5, y: 5 },
//     color: "red",
// });
drawCloth(); // Tischtuch zeichnen
drawWood(); // Rand vom Tisch zeichnen

balls.forEach((ball) => ball.draw());

// function loop() {
//     clearCanvas();
//     drawCloth(); // Tischtuch zeichnen
//     drawWood(); // Rand vom Tisch zeichnen
//     b.update();
//     b.draw();
//     requestAnimationFrame(loop);
// }

// loop();