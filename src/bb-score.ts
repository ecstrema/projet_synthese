import { BbElement } from "./bb-element";

export class BbScore extends BbElement {

    constructor() {
        super();
    }

    value: number = 0;

    paint(ctx: CanvasRenderingContext2D) {
        const t = this.value.toString();
        const metrics = ctx.measureText(t);
        ctx.save();
        ctx.font = "30px Helvetica";
        ctx.fillText(t, (ctx.canvas.width - metrics.width) * 0.5, metrics.actualBoundingBoxAscent + 50);
        ctx.restore();
    }
}
