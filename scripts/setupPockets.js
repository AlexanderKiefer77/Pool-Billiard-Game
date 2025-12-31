import { canvas, margin } from "./canvas.js";
import { Pocket, cornerOffset } from "../models/pocket.class.js";


export function getPockets() {

    // const cornerOffset = 12; // damit die Ecktaschen etwas verschoben werden // in pocket.class.js verschoben

    return [
        // oben links
        new Pocket({
            pos: {
                x: margin + cornerOffset,
                y: margin + cornerOffset
            },
            type: "corner", // für gelbe Linie um pocket
            rotation: 0, // für gelbe Linie um pocket
        }),
        // oben mitte
        new Pocket({
            pos: {
                x: canvas.width / 2,
                y: margin
            },
            type: "edge",
            rotation: 0,
        }),
        // oben rechts
        new Pocket({
            pos: {
                x: canvas.width - margin - cornerOffset,
                y: margin + cornerOffset
            },
            type: "corner",
            rotation: 90,
        }),
        // unten links
        new Pocket({
            pos: {
                x: margin + cornerOffset,
                y: canvas.height - margin - cornerOffset
            },
            type: "corner",
            rotation: -90,
        }),
        // unten mitte
        new Pocket({
            pos: {
                x: canvas.width / 2,
                y: canvas.height - margin
            },
            type: "edge",
            rotation: 180,
        }),
        // unten rechts
        new Pocket({
            pos: {
                x: canvas.width - margin - cornerOffset,
                y: canvas.height - margin - cornerOffset
            },
            type: "corner",
            rotation: 180,
        }),
    ];

}