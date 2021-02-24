import { BbElement } from "./bb-element";
import { BbGame, getGame } from "./bb-game";

export class BbTarget extends BbElement {
    touched: boolean = false;

    versLeBas = false;

    constructor() {
        super();

        const game = getGame();
        if (!game) {
            throw new Error("This element is not part of a game.")
        }
        else {
            this.bb.height = this.bb.width = game.bb.height * 0.2;
            const margins = game.bb.height * 0.1;

            this.bb.y = Math.random() * (game.bb.height - this.bb.height - margins) + margins;
            this.bb.x = game.bb.w;
        }
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.bb.x, this.bb.y, this.bb.w, this.bb.h);
    }

    move(game: BbGame) {
        if (this.touched) {
            if (this.versLeBas) {
                this.bb.y += game.bb.width * 0.005 * (game.score + 1);
            }
            else {
                this.bb.y += game.bb.width * -0.005 * (game.score + 1);
            }
        }
        else {
            this.bb.x += game.bb.width * -0.005 * (game.score + 1), 0;
        }
        return this;
    }
}
