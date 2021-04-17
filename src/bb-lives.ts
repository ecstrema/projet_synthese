import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbLives extends BbElement {
    private static INITIAL_SUPPLEMENTARY_LIVES = 3;
    supplementaryLives: number = BbLives.INITIAL_SUPPLEMENTARY_LIVES;

    constructor(game: BbGame) {
        super();
        this.bb.x = game.bb.w * 0.5;
        this.bb.y = 70;
        this.bb.h = this.bb.w = game.bb.w * 0.02;
    }

    reset() {
        this.supplementaryLives = BbLives.INITIAL_SUPPLEMENTARY_LIVES;
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = "#f33";

        const MARGIN = 5; // px
        let x = this.bb.x;
        x -= (this.bb.w + MARGIN) * (this.supplementaryLives - 1) * 0.5;
        // x -= (this.bb.w + MARGIN) * this.supplementaryLives;

        ctx.beginPath();
        for (let i = 0; i < this.supplementaryLives; i++) {
            BbLives.drawHeart(ctx, x, this.bb.y, this.bb.w, this.bb.h);
            x += this.bb.h + MARGIN;
        }
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    private static drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number){
        const topCurveHeight = h * 0.3;
        const halfWidth = w * 0.5;
        ctx.moveTo(x, y + topCurveHeight);
        // top left curve
        ctx.bezierCurveTo(
            x, y,
            x - halfWidth, y,
            x - halfWidth, y + topCurveHeight
        );

        // bottom left curve
        ctx.bezierCurveTo(
            x - halfWidth, y + (h + topCurveHeight) * 0.5,
            x, y + (h + topCurveHeight) * 0.5,
            x, y + h
        );

        // bottom right curve
        ctx.bezierCurveTo(
            x, y + (h + topCurveHeight) * 0.5,
            x + halfWidth, y + (h + topCurveHeight) * 0.5,
            x + halfWidth, y + topCurveHeight
        );

        // top right curve
        ctx.bezierCurveTo(
            x + halfWidth, y,
            x, y,
            x, y + topCurveHeight
        );
    }
}
