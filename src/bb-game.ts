import { BbElement } from "./bb-element";
import { BbMouse } from "./bb-mouse";
import { BbPacman } from "./bb-pacman";
import { BbPlayer } from "./bb-player";
import { BbScore } from "./bb-score";
import { BbTarget } from "./bb-target";

export class BbGame extends BbElement {
    ctx: CanvasRenderingContext2D | null;

    playing = false;

    score: BbScore;

    player: BbPlayer;
    targets: BbTarget[];

    constructor() {
        super();

        BbMouse.init();

        const container = document.body;
        container.style.margin = '0px';
        container.style.height = `${window.innerHeight}px`;

        const canvas = document.createElement("canvas");
        canvas.style.display = "block";
        canvas.style.position = "absolute";
        canvas.height = this.bb.height = container.scrollHeight;
        canvas.width = this.bb.width = container.scrollWidth;

        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");

        this.score = new BbScore();
        this.player = new BbPlayer(this);
        this.targets = [];
    }

    async refresh() {
        if (!this.playing) {
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
        this.score.paint(this.ctx);
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
                this.score.value++;
            }
        });

        BbPacman.updateMouthAngle();
    }

    async removeTarget(t: BbTarget) {
        delete this.targets[this.targets.indexOf(t)];
    }

    addTarget(): void {
        for (let i = 0; i < this.targets.length; i++) {
            const element = this.targets[i];
            if (!element) {
                const newTarget = new BbTarget(this);
                newTarget.speed = Math.random() * (this.score.value + 1);
                this.targets[i] = newTarget;
                return;
            }
        }
        this.targets.push(new BbTarget(this));
    }

    addTargetCallbacks() {
        if (!this.playing) {
            return;
        }
        this.addTarget();
        const nextTimeoutIn = Math.max(Math.random() * 5000 / (this.score.value + 1), 1000);
        console.log(nextTimeoutIn);

        setTimeout(this.addTargetCallbacks.bind(this), nextTimeoutIn);
    }

    start() {
        this.playing = true;
        this.addTargetCallbacks();
        this.refresh();
    }

    stop() {
        this.playing = false;
    }

    static getGame(): BbGame {
        if (!BbGame.pGame) {
            BbGame.pGame = new BbGame();
            return BbGame.pGame;
        }
        return BbGame.pGame;
    }

    private static pGame: BbGame | null = null;
}
