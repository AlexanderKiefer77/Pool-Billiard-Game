import { canvas, margin } from "./canvas.js";
import { Pocket } from "../models/pocket.class.js";

const cornerOffset = 12; // damit die Ecktaschen etwas verschoben werden

export const pockets = [
    // oben links
    new Pocket({
        pos: {
            x: margin + cornerOffset,
            y: margin + cornerOffset
        }
    }),
    // oben mitte
    new Pocket({
        pos: {
            x: canvas.width / 2,
            y: margin
        }
    }),
    // oben rechts
    new Pocket({
        pos: {
            x: canvas.width - margin - cornerOffset,
            y: margin + cornerOffset
        }
    }),
    // unten links
    new Pocket({
        pos: {
            x: margin + cornerOffset,
            y: canvas.height - margin - cornerOffset
        }
    }),
    // unten mitte
    new Pocket({
        pos: {
            x: canvas.width / 2,
            y: canvas.height - margin
        }
    }),
    // unten rechts
    new Pocket({
        pos: {
            x: canvas.width - margin - cornerOffset,
            y: canvas.height - margin - cornerOffset
        }
    }),
];

