// export const canvas = document.querySelector("canvas"); // in Zusammenhang mit zweitem Canvas geändert

import { norm } from "./math.js";

/** @type { HTMLCanvasElement } */
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

/** @type { HTMLCanvasElement } */
export const tableCanvas = document.getElementById("tableCanvas");
export const tctx = tableCanvas.getContext("2d");

export const margin = 60;

// canvas.width = 1200 + 2 * margin; // in Zusammenhang mit zweitem Canvas geändert
// canvas.height = 600 + 2 * margin;
canvas.width = tableCanvas.width = 1200 + 2 * margin;
canvas.height = tableCanvas.height = 600 + 2 * margin;

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// export const canvasNorm = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height); // angepasst in Zusammenhang mit norm() function
export const canvasNorm = norm({ x: canvas.width, y: canvas.height });
