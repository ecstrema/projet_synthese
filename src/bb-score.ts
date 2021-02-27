import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbScore extends BbElement {

    constructor() {
        super();
        this.bb.y = this.marginTop;
    }

    reset() {
        this.bb.y = this.marginTop;
        this.sizePx = this.minSizePx;
        this.value = 0;
    }

    value: number = 0;

    minSizePx: number = 30;
    maxSizePx: number = 80;
    sizePx: number = this.minSizePx;
    marginTop: number = 50;

    paint(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.font = this.sizePx.toFixed(3) + "px Helvetica";
        const t = this.value.toString();
        const metrics = ctx.measureText(t);
        ctx.fillText(t, (ctx.canvas.width - metrics.width) * 0.5, this.bb.y);
        ctx.restore();
    }
    move(game: BbGame) {
        const distanceToTravel = game.bb.h * 0.5 - this.marginTop;
        this.bb.y += distanceToTravel * 0.01;
        const distanceTravelled = this.bb.y - this.marginTop;
        const ratio = distanceTravelled / distanceToTravel;
        this.sizePx += (this.maxSizePx - this.sizePx ) * ratio;
    }
}
