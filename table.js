import { canvas, ctx, margin } from "./canvas.js";

// Tischtuch zeichnen
export function drawCloth() {
    ctx.fillStyle = "rgb(26, 130, 30";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Rand vom Tisch zeichnen
export function drawWood() {
    ctx.fillStyle = "hsl(16, 76%, 30%";
    ctx.fillRect(0, 0, canvas.width, margin); // oben
    ctx.fillRect(0, canvas.height - margin, canvas.width, margin); // unten
    ctx.fillRect(0, 0, margin, canvas.height); // links
    ctx.fillRect(canvas.width - margin, 0, margin, canvas.height); // rechts

}