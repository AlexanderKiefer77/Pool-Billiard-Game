import { Bumper } from "../models/bumper.class.js"
import { pocketSize } from "../models/pocket.class.js";
import { canvas, margin } from "./canvas.js";


export function getBumpers() {

    const width = 20; // bandenbreite
    const grace = 10; // offsetCorner Wert

    /* nur info (ist in einer anderer Datei definiert)
    pocketSize = 30
    margin = 60  // brauner Tischrand
    */
    return [
        new Bumper({ // top left
            coords: [
                { x: margin + pocketSize + grace, y: margin }, // OL
                { x: margin + pocketSize + width + grace, y: margin + width }, // UL
                { x: canvas.width / 2 - pocketSize - width, y: margin + width }, // UR
                { x: canvas.width / 2 - pocketSize, y: margin } // OR
            ],
        }),
        new Bumper({ // top right
            coords: [
                { x: canvas.width / 2 + pocketSize, y: margin }, // LO
                { x: canvas.width / 2 + pocketSize + width, y: margin + width }, // LU
                { x: canvas.width - pocketSize - margin - width - grace, y: margin + width }, // RU
                { x: canvas.width - pocketSize - margin - grace, y: margin } // RO
            ],
        }),
        new Bumper({ // side right
            coords: [
                { x: canvas.width - margin, y: margin + pocketSize + grace }, // RO
                { x: canvas.width - (margin + width), y: margin + pocketSize + width + grace }, // LO
                { x: canvas.width - (margin + width), y: canvas.height - margin - width - pocketSize - grace }, // LU
                { x: canvas.width - margin, y: canvas.height - margin - pocketSize - grace } // RU
            ],
        }),
        new Bumper({ // bottom right       
            coords: [
                { x: canvas.width - pocketSize - margin - grace, y: canvas.height - margin }, // RU
                { x: canvas.width - pocketSize - margin - width - grace, y: canvas.height - (margin + width) }, // RO
                { x: canvas.width / 2 + pocketSize + width, y: canvas.height - (margin + width) }, // LO
                { x: canvas.width / 2 + pocketSize, y: canvas.height - margin } // LU
            ],
        }),
        new Bumper({ // bottom left
            coords: [
                { x: canvas.width / 2 - pocketSize, y: canvas.height - margin }, // RU
                { x: canvas.width / 2 - pocketSize - width, y: canvas.height - (margin + width) }, // RO
                { x: margin + pocketSize + width + grace, y: canvas.height - (margin + width) }, // LO
                { x: margin + pocketSize + grace, y: canvas.height - margin } // LU
            ],
        }),
        new Bumper({ // side left
            coords: [
                { x: margin, y: canvas.height - margin - pocketSize - grace }, // LU
                { x: margin + width, y: canvas.height - margin - width - pocketSize - grace }, // RU
                { x: margin + width, y: margin + pocketSize + width + grace }, // RO
                { x: margin, y: margin + pocketSize + grace } // LO
            ],
        }),
    ];
}