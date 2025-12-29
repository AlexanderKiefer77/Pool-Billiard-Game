import { Ball } from "./models/ball.class.js";
import { Controller } from "./models/controller.class.js";
import { clearCanvas } from "./scripts/canvas.js";
import { mouse } from "./scripts/mouse.js";
import { balls, whiteBall } from "./scripts/setupBalls.js";
import { drawCloth, drawWood } from "./scripts/table.js";

// war Zwischenschritt, wurde gelöscht !
// const b = new Ball({
//     pos: { x: 400, y: 300 },
//     vel: { x: 5, y: 5 },
//     color: "red",
// });

const controller = new Controller(whiteBall);

drawCloth(); // Tischtuch zeichnen
drawWood(); // Rand vom Tisch zeichnen

balls.forEach((ball) => ball.draw());

function loop() {
    clearCanvas();
    drawCloth(); // Tischtuch zeichnen
    drawWood(); // Rand vom Tisch zeichnen
    controller.update();
    balls.forEach(b => b.update(balls));
    balls.forEach(b => b.draw());
    controller.draw();
    controller.active = balls.every(b => b.idle);
    requestAnimationFrame(loop);
}
loop();

