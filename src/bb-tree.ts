import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbTree extends BbElement {

    constructor(game: BbGame, aleatoric: boolean = false) {
        super();
        this.bb.x = aleatoric ? Math.random() * game.bb.w : game.bb.w;
        this.bb.y = Math.random() * game.bb.h;
        this.bb.h = Math.max(Math.random() * game.bb.h * 0.1, 0.01);
        this.bb.w = this.bb.h * 0.4;
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = "lightgrey";
        const centerX = (this.bb.x1 + this.bb.x2) * 0.5;
        const trunkW = 0.2 * this.bb.w;
        const trunkLeft = centerX - trunkW;
        const trunkRight = centerX + trunkW;
        ctx.moveTo(trunkLeft, this.bb.y2);
        const topTrunkY = this.bb.y2 - this.bb.h * 0.3;
        ctx.lineTo(trunkLeft, topTrunkY);
        ctx.lineTo(this.bb.x, topTrunkY);
        ctx.lineTo(centerX, this.bb.y1);
        ctx.lineTo(this.bb.x2, topTrunkY);
        ctx.lineTo(trunkRight, topTrunkY);
        ctx.lineTo(trunkRight, this.bb.y2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
