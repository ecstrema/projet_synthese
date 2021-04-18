import { BbBackground } from "./bb-background";
import { BbElement } from "./bb-element";
import { BbLives } from "./bb-lives";
import { BbMouse } from "./bb-mouse";
import { BbPacman } from "./bb-pacman";
import { BbPlayer } from "./bb-player";
import { BbScore } from "./bb-score";
import { BbTarget } from "./bb-target";
import { BbArrayUtils } from "./utils/bb-array-utils";
import { bound } from "./utils/bb-math";

export class BbGame extends BbElement {
    ctx: CanvasRenderingContext2D | null;

    playing: boolean = false;

    score: BbScore;

    player: BbPlayer;
    targets: BbTarget[];
    background: BbBackground;
    lives: BbLives;

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
        this.lives = new BbLives(this);
        this.player = new BbPlayer(this);
        this.background = new BbBackground();
        this.targets = [];
        if (this.ctx) {
            this.ctx.canvas.addEventListener("click", this.restartIfNotPlaying.bind(this));
            this.ctx.canvas.addEventListener("keyup", this.restartIfNotPlaying.bind(this));
        }
    }

    restartIfNotPlaying() {
        if (!this.playing) {
            this.restart();
        }
    }

    restart() {
        this.player.resetSize(this);
        this.lives.reset();
        this.targets = [];
        this.score.reset();
        this.background.restart();
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

        const allTargetsPromises: Promise<void>[] = []
        allTargetsPromises.push(Promise.resolve().then(() => this.background.moveAndPaint(this)))
        allTargetsPromises.push(Promise.resolve().then(() => this.score.paint(this.ctx as CanvasRenderingContext2D)))
        allTargetsPromises.push(Promise.resolve().then(() => this.lives.paint(this.ctx as CanvasRenderingContext2D)))
        allTargetsPromises.push(Promise.resolve().then(() => this.player.moveAndPaint(this)))

        this.targets.forEach((t: BbTarget|null) => {
            allTargetsPromises.push(
                Promise.resolve().then(() => {
                if (!t) {
                    return;
                }
                t.move(this);
                if (t.bb.intersects(this.bb) && this.ctx) {
                    t.paint(this.ctx);
                }
                else if (t.bb.x < 0) {
                    this.lives.supplementaryLives--;
                    this.removeTarget(t);
                    t.touched = true;

                    if (this.lives.supplementaryLives < 0) {
                        this.playing = false;
                        this.gameOverFrame();
                    }
                }
                else {
                    this.removeTarget(t);
                    return;
                }
                if (!t.touched && this.ctx && this.player.isPointInPacman(t.bb.x, t.bb.y, this.ctx)) {
                    this.removeTarget(t);
                    t.touched = true;
                    this.score.value++;
                }
            }));
        });
        Promise.all(allTargetsPromises).then(BbPacman.updateMouthAngle);
    }

    gameOverFrame(count: number = 0) {
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

    addTargetCallbacks(inFrames: number = 0) {
        if (!this.playing) {
            return;
        }
        if (inFrames > 0) {
            requestAnimationFrame(() => this.addTargetCallbacks(inFrames - 1));
            return;
        }

        this.addTarget();


        const nextTimeoutIn = bound(5 - Math.log10(this.score.value) * 3 - Math.random(), 0.5, 4) * 60;
        if (this.score.value > 30) {
            bound(this.player.bb.height = this.player.bb.width = this.player.bb.height * 0.99, 10);
        }
        requestAnimationFrame(() => this.addTargetCallbacks(nextTimeoutIn));
    }

    start() {
        this.playing = true;
        this.addTargetCallbacks();
        this.background.restart();
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
