import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbTree extends BbElement {

    constructor(game: BbGame, aleatoric: boolean = false) {
        super();
        this.bb.x = aleatoric ? Math.random() * game.bb.w : game.bb.w;
        this.bb.y = Math.random() * game.bb.h;
        this.bb.h = Math.max(Math.random() * 50, 10);
        this.bb.w = this.bb.h * 0.4;
    }

    getPath(path: Path2D) {
        const centerX = (this.bb.x1 + this.bb.x2) * 0.5;
        const trunkW = 0.2 * this.bb.w;
        const trunkLeft = centerX - trunkW;
        const trunkRight = centerX + trunkW;
        path.moveTo(trunkLeft, this.bb.y2);
        const topTrunkY = this.bb.y2 - this.bb.h * 0.3;
        path.lineTo(trunkLeft, topTrunkY);
        path.lineTo(this.bb.x, topTrunkY);
        path.lineTo(centerX, this.bb.y1);
        path.lineTo(this.bb.x2, topTrunkY);
        path.lineTo(trunkRight, topTrunkY);
        path.lineTo(trunkRight, this.bb.y2);
    }
}
