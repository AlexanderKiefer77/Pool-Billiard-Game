import { canvas, tctx, margin } from "./canvas.js";

// Tischtuch zeichnen
export function drawCloth() {
    tctx.fillStyle = "rgb(26, 130, 30)";
    tctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Rand vom Tisch zeichnen
export function drawWood() {
    tctx.fillStyle = "hsl(16, 76%, 30%)";
    tctx.fillRect(0, 0, canvas.width, margin); // oben
    tctx.fillRect(0, canvas.height - margin, canvas.width, margin); // unten
    tctx.fillRect(0, 0, margin, canvas.height); // links
    tctx.fillRect(canvas.width - margin, 0, margin, canvas.height); // rechts

}