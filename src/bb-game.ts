import { BbElement } from "./bb-element";
import { BbPlayer } from "./bb-player";
import { BbTarget } from "./bb-target";

export class BbGame extends BbElement {
    ctx: CanvasRenderingContext2D | null;

    looping = false;

    mouseX: number = 0;
    mouseY: number = 0;

    score: number = 0;

    fps = 40;

    player: BbPlayer;
    targets: BbTarget[];

    constructor() {
        super();

        const container = document.body;
        container.style.margin = '0px';
        container.style.height = `${window.innerHeight}px`;

        const canvas = document.createElement("canvas");
        canvas.style.display = "block";
        canvas.style.position = "absolute";
        canvas.height = this.bb.height = container.scrollHeight;
        canvas.width = this.bb.width = container.scrollWidth;

        window.addEventListener("mousemove", (ev: MouseEvent) => {
            this.mouseX = ev.clientX;
            this.mouseY = ev.clientY;
        })

        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");

        this.player = new BbPlayer(this);
        this.targets = [];
    }

    async refresh() {
        if (!this.looping) {
            return;
        }
        if (!this.targets.length) {
            // this.stop();
            return;
        }
        if (!this.ctx) {
            this.stop();
            console.error("no drawing context");
            return;
        }
        requestAnimationFrame(this.refresh.bind(this));

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.player.move(this);
        this.player.paint(this.ctx);
        this.targets.forEach((t: BbTarget) => {
            if (!t) {
                return;
            }
            t.move(this);
            if (t.bb.intersects(this.bb) && this.ctx) {
                t.paint(this.ctx);
            }
            else {
                this.removeTarget(t);
                return;
            }
            if (!t.touched && t.bb.intersects(this.player.bb)) {
                t.touched = true;
                t.versLeBas = this.score % 2 ? true : false;
                this.score++;
                this.addTarget();
            }
        });
    }

    async removeTarget(t: BbTarget) {
        delete this.targets[this.targets.indexOf(t)];
    }

    addTarget(): void {
        for (let i = 0; i < this.targets.length; i++) {
            const element = this.targets[i];
            if (!element) {
                this.targets[i] = new BbTarget();
                return;
            }
        }
        this.targets.push(new BbTarget());
    }

    start() {
        this.looping = true;
        this.targets.push(new BbTarget());
        this.refresh();
    }

    stop() {
        this.looping = false;
    }
}

export function getGame(): BbGame {
    if (!game) {
        game = new BbGame();
        return game;
    }
    return game;
}

let game: BbGame | null;
