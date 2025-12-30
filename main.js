// import { Ball } from "./models/ball.class.js";  // in Verbindung mir game.class.js entfernt
// import { Controller } from "./models/controller.class.js"; // in Verbindung mir game.class.js entfernt
// import { Pocket } from "./models/pocket.class.js"; // in Verbindung mir game.class.js entfernt
import { Game } from "./models/game.class.js";
import { clearCanvas } from "./scripts/canvas.js";
// import { mouse } from "./scripts/mouse.js"; // in Verbindung mir game.class.js entfernt
import { balls, whiteBall } from "./scripts/setupBalls.js";
import { pockets } from "./scripts/setupPockets.js";
// import { drawCloth, drawWood } from "./scripts/table.js"; // in Verbindung mir game.class.js entfernt

const game = new Game({balls, pockets});

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
    // drawCloth(); // Tischtuch zeichnen // in Verbindung mir game.class.js entfernt
    // drawWood(); // Rand vom Tisch zeichnen // in Verbindung mir game.class.js entfernt
    // pockets.forEach((p) => p.draw()); // in Verbindung mir game.class.js entfernt
    // controller.update(); // in Verbindung mir game.class.js entfernt
    // balls.forEach(b => b.update(balls, pockets)); // in Verbindung mir game.class.js entfernt
    // balls.forEach(b => b.draw()); // in Verbindung mir game.class.js entfernt
    // controller.draw(); // in Verbindung mir game.class.js entfernt
    // controller.active = balls.every(b => b.idle); // in Verbindung mir game.class.js entfernt
    game.update();  // neu in Verbindung mit game.class.js
    game.draw();   // neu in Verbindung mit game.class.js
    requestAnimationFrame(loop);
}
loop();

