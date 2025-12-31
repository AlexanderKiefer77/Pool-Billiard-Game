import { canvas, ctx, margin } from "../scripts/canvas.js";
import { dotProduct, scale, sub, add, distance, angleBetween, rotate, norm } from "../scripts/math.js";
import { SOUND } from "../scripts/sound.js";

export class Ball {
    constructor({ pos, color, vel }) {
        this.pos = pos;
        this.originalPos = { ...this.pos }; // für reset funktion
        this.color = color;
        this.vel = vel ?? { x: 0, y: 0 }; // Geschwindigkeit
        this.originalVel = { ...this.vel }; // für reset funktion
        this.size = 18;
        this.friction = 0.99; // Reibung
        this.inPocket = false; // Ball in Tasche
        this.gradient = ctx.createRadialGradient(  // Design Bälle
            -0.4 * this.size, // x-pos
            -0.4 * this.size, // y-pos
            1,
            0,
            0,
            this.size); // Design Bälle
        this.gradient.addColorStop(0, "rgba(255, 255, 255, 0.25)"); // Design Bälle
        this.gradient.addColorStop(0.4, "rgba(255, 255, 255, 0)"); // Design Bälle
        this.gradient.addColorStop(0.7, "rgba(0, 0, 0, 0)"); // Schatten im Bällen
        this.gradient.addColorStop(1, "rgba(0, 0, 0, 0.3)"); // Schatten im Bällen
        this.alpha = 1;
    }

    get idle() { // für Ball bewegt sich nicht mehr
        return this.vel.x == 0 && this.vel.y == 0;
    }

    draw() {
        // pocket animation
        if (this.alpha == 0) return;
        if (this.inPocket) {
            this.alpha = Math.max(0, this.alpha - 0.2);
        }
        // prepare drawing
        const shadowFactor = { // für Schatten der Bälle flexibel zu machen
            x: ((this.pos.x - canvas.width / 2) / canvas.width) * 0.5,
            y: 0.25,
        };
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.pos.x, this.pos.y); // für gradient auf Bälle
        // drwa shadow
        // ctx.beginPath();
        // ctx.arc(
        //     shadowFactor.x * this.size,
        //     shadowFactor.y * this.size,
        //     this.size,
        //     0,
        //     2 * Math.PI,
        // );
        // ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        // ctx.fill();
        // ctx.closePath();

        // draw regular ball
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        // draw light effects
        ctx.fillStyle = this.gradient; // für gradient auf Bälle
        ctx.fill(); // für gradient auf Bälle
        ctx.closePath();
        ctx.restore();
    }

    update(game) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;
        this.handleTinyVelocities();
        if (this.inPocket) return;
        this.bounceOfWalls();
        this.bounceOffBumpers(game.bumpers);
        this.checkPockets(game.pockets);
        this.collideWithBalls(game.balls);
        //this.handleTinyVelocities();
    }

    bounceOfWalls() { // wenn Ball an Bande anstösst
        // horizontal
        if (this.pos.x + this.size >= canvas.width - margin) {
            this.pos.x = canvas.width - margin - this.size;
            this.vel.x *= -1;
        } else if (this.pos.x - this.size <= margin) {
            this.pos.x = this.size + margin;
            this.vel.x *= -1;
        }

        // vertikal
        if (this.pos.y + this.size >= canvas.height - margin) {
            this.pos.y = canvas.height - margin - this.size;
            this.vel.y *= -1;
        } else if (this.pos.y - this.size <= margin) {
            this.pos.y = this.size + margin;
            this.vel.y *= -1;
        }
    }

    handleTinyVelocities() {
        const treshold = 0.04; // Grenzwert für Bewegung des Ball´s. Wert nicht zu klein oder zu groß, muss entsprechend der Bewegung festgelegt werden.
        if (Math.abs(this.vel.x) < treshold) {
            this.vel.x = 0; // wenn Bewegung kleiner als 0.04 ist, wird die Bewegung auf 0 gesetzt.
        }
        if (Math.abs(this.vel.y) < treshold) {
            this.vel.y = 0;
        }
    }

    collideWithBalls(balls) {
        balls.forEach(ball => {
            if (this == ball || ball.inPocket) return;
            const dist = distance(this.pos, ball.pos);
            // check for collision
            if (dist > this.size + ball.size) return;
            // pull balls apart when there is overlap
            const L = this.size + ball.size - dist;
            const x_d = sub(ball.pos, this.pos);
            const c = scale(L / (2 * dist), x_d);
            this.pos = sub(this.pos, c);
            ball.pos = add(ball.pos, c);
            // elastic collision
            const v_d = sub(this.vel, ball.vel);
            const w = scale(1 / Math.pow(dist, 2) * dotProduct(x_d, v_d), x_d);
            this.vel = sub(this.vel, w);
            ball.vel = add(ball.vel, w);
            // play sound
            const volume = Math.min(1, (norm(this.vel) + norm(ball.vel)) / 15);
            SOUND.COLLISION.volume = volume;
            // SOUND.COLLISION.volume = 0.3;
            SOUND.COLLISION.play();
        })
    }

    checkPockets(pockets) {
        pockets.forEach(pocket => {
            if (pocket.includes(this)) {
                this.inPocket = true;
                // play sound

                SOUND.POCKET.play();
                SOUND.POCKET.volume = 0.3;
                return;
            }
        })
    }

    reset(game) {
        this.inPocket = false;
        this.alpha = 1;
        this.pos = { ...this.originalPos };
        this.vel = { ...this.originalVel };
        if (this == game.whiteBall) {
            this.avoidOtherBalls(game.balls);
        }
    }

    intersects(ball) {
        return distance(this.pos, ball.pos) <= this.size + ball.size;
    }

    avoidOtherBalls(balls) { // für whitball nach reset zu positionieren falls ein anderer Ball auf dem Punkt liegt
        const delta = 4;
        while (balls.some(ball => ball != this && this.intersects(ball))) {
            const coord = Math.random() < 0.5 ? "x" : "y";
            const sign = Math.random() < 0.5 ? +1 : -1;
            this.pos[coord] += delta * sign;
        };
    }

    bounceOffBumpers(bumpers) {
        bumpers.forEach(bumper => {
            const segment = bumper.intersectionSegment(this);
            if (segment != null) {
                const [a, b] = segment;
                const vector = sub(b, a);
                const angle = angleBetween(this.vel, vector);
                this.vel = rotate(2 * angle, this.vel);
                // play sound
                const volume = Math.min(1, norm(this.vel) / 20);                
                SOUND.BUMPER.volume = volume;
                // SOUND.BUMPER.volume = 0.3;
                SOUND.BUMPER.play();

            }
        })
    }
}