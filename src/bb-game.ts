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

    public get speed(): number {
        return Math.pow(this.score.value + 1, 1.1);
    }

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
                t.versLeBas = this.score.value % 2 ? true : false;
                this.score.value++;
                this.addTarget();
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
                this.targets[i] = new BbTarget(this);
                return;
            }
        }
        this.targets.push(new BbTarget(this));
    }

    start() {
        this.playing = true;
        this.targets.push(new BbTarget(this));
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
    private static creatingSingleton = false;
}
