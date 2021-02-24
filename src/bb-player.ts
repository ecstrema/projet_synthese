import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbPlayer extends BbElement {
    constructor(game: BbGame) {
        super();

        if (!game) {
            throw new Error("This player is not part of a game.")
        }
        else {
            this.bb.width = this.bb.height = game.bb.height * 0.1;

            this.bb.y = (game.bb.h - this.bb.h) * 0.5;
            this.bb.x = (game.bb.w - this.bb.w) * 0.15;
        }
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.bb.x, this.bb.y, this.bb.w, this.bb.h);
    }

    move(scene: BbGame) {
        // lerp? (linear interpolation)...
        // this.bb.y = (scene.mouseY - this.bb.y) * 0.9 + this.bb.y;

        // or teleportation?
        this.bb.y = scene.mouseY;
    }
}
