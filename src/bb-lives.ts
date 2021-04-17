import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbLives extends BbElement {
    private static INITIAL_SUPPLEMENTARY_LIVES = 3;
    supplementaryLives: number = BbLives.INITIAL_SUPPLEMENTARY_LIVES;

    constructor(game: BbGame) {
        super();
        this.bb.x = game.bb.w * 0.5;
        this.bb.y = 70;
        this.bb.h = game.bb.w * 0.02;
    }

    reset() {
        this.supplementaryLives = BbLives.INITIAL_SUPPLEMENTARY_LIVES;
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = "#f33";

        const MARGIN = 5; // px
        let x = this.bb.x;
        x -= ((this.bb.h + MARGIN) * this.supplementaryLives - MARGIN) * 0.5;

        for (let i = 0; i < this.supplementaryLives; i++) {
            ctx.fillRect(x, this.bb.y, this.bb.h, this.bb.h);
            x += this.bb.h + MARGIN;
        }
        ctx.restore();
    }
}
