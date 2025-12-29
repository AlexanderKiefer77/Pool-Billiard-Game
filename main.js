import { Ball } from "./Ball.js";
import { clearCanvas } from "./canvas.js";
import { drawCloth, drawWood } from "./table.js";

const b = new Ball({
    pos: { x: 400, y: 300 },
    vel: { x: 0, y: 0 },
    color: "red",
});

function loop() {
    clearCanvas();
    drawCloth(); // Tischtuch zeichnen
    drawWood(); // Rand vom Tisch zeichnen
    b.update();
    b.draw();
    requestAnimationFrame(loop);
}

loop();