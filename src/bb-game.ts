import { BbBackground } from "./bb-background";
import { BbElement } from "./bb-element";
import { BbMouse } from "./bb-mouse";
import { BbPacman } from "./bb-pacman";
import { BbPlayer } from "./bb-player";
import { BbScore } from "./bb-score";
import { BbTarget } from "./bb-target";
import { BbArrayUtils } from "./utils/bb-array-utils";
import { bound } from "./utils/bb-math";

export class BbGame extends BbElement {
    ctx: CanvasRenderingContext2D | null;

    playing = false;

    score: BbScore;

    player: BbPlayer;
    targets: (BbTarget|null)[];
    background: BbBackground;

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
        this.background = new BbBackground();
        this.targets = [];

        this.ctx?.canvas.addEventListener("click", () => this.restartIfNotPlaying());
        this.ctx?.canvas.addEventListener("keyup", () => this.restartIfNotPlaying());
    }

    restartIfNotPlaying() {
        if (!this.playing) {
            this.restart();
        }
    }

    restart() {
        this.targets = [];
        this.score.reset();
        this.background.reset();
        this.start();
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

        this.background.move(this);
        this.background.paint(this.ctx);
        this.score.paint(this.ctx);
        this.player.move(this);
        this.player.paint(this.ctx);
        this.targets.forEach((t: BbTarget|null) => {
            if (!t) {
                return;
            }
            t.move(this);
            if (t.bb.intersects(this.bb) && this.ctx) {
                t.paint(this.ctx);
            }
            else if (t.bb.x < 0) {
                this.playing = false;
                this.gameOverFrame();
            }
            else {
                this.removeTarget(t);
                return;
            }
            if (!t.touched && this.ctx && this.player.intersectsWithCircle(t.bb.x, t.bb.y, this.ctx)) {
                this.removeTarget(t);
                t.touched = true;
                this.score.value++;
            }
        });

        BbPacman.updateMouthAngle();
    }

    gameOverFrame(count = 0) {
        if (this.playing) {
            return;
        }
        this.score.move(this);
        if (count > 100) {
            if (this.ctx) {
                this.ctx.save();
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, this.bb.w, this.bb.h);
                this.ctx.fillStyle = "white";
                this.score.paint(this.ctx);
                this.ctx.font = "30px Helvetica";
                const t = "Appuyez sur une touche pour rejouer.";
                const m = this.ctx.measureText(t);
                this.ctx.fillText(t, (this.bb.w - m.width) * 0.5, this.bb.h * 0.5 + this.score.sizePx * 2);
                this.ctx.restore();
            }
            return;
        }
        if (this.ctx) {
            this.ctx.save();
            this.ctx.fillStyle = "#00000055";
            this.ctx.fillRect(0, 0, this.bb.w, this.bb.h);
            this.ctx.fillStyle = "white";
            this.score.paint(this.ctx);
            this.ctx.restore();
        }
        else {
            throw new Error("No Context set at end of game???");
        }
        setTimeout(() => {
            this.gameOverFrame.bind(this)(count + 1);
        }, 30);
    }

    async removeTarget(t: BbTarget) {
        delete this.targets[this.targets.indexOf(t)];
    }

    addTarget(): void {
        BbArrayUtils.fillFirstEmpty(BbTarget, this.targets, this);
    }

    addTargetCallbacks() {
        if (!this.playing) {
            return;
        }
        this.addTarget();


        const nextTimeoutIn = bound(5 - Math.log10(this.score.value) * 3 - Math.random(), 0.5, 4) * 1000;
        if (this.score.value > 30) {
            bound(this.player.bb.height = this.player.bb.width = this.player.bb.height * 0.99, 10);
        }
        setTimeout(this.addTargetCallbacks.bind(this), nextTimeoutIn);
    }

    start() {
        this.playing = true;
        this.addTargetCallbacks();
        this.background.start();
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
