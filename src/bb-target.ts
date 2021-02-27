import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbTarget extends BbElement {
    touched: boolean = false;

    speed = 1;

    constructor(game: BbGame) {
        super();

        this.bb.height = this.bb.width = game.bb.h * 0.02;
        const margins = game.bb.height * 0.1;

        this.bb.y = Math.random() * (game.bb.height - this.bb.height - margins) + margins;
        this.bb.x = game.bb.w;
    }

    paint(ctx: CanvasRenderingContext2D) {
        if (this.touched) {
            return;
        }
        const radius = (this.bb.x2 - this.bb.x1) * 0.5;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.bb.x + radius, this.bb.y + radius, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    move(game: BbGame) {
        this.bb.x -= game.bb.width * 0.005 * this.speed;
        return this;
    }
}
