import { BbGame } from "./bb-game";
import { BbTree } from "./bb-tree";

export class BbBackground {
    trees: BbTree[] = [];

    translateX: number = 0;

    path: Path2D = new Path2D();
    constructor() { }

    restart() {
        this.trees.length = 0;
        this.path = new Path2D();
        for (let i = 0; i < Math.max(Math.ceil(Math.random() * 100), 50); i++) {
            this.trees.push(new BbTree(BbGame.getGame(), true));
        }

        for (const tree of this.trees) {
            tree.getPath(this.path);
        }
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = "lightgray";
        ctx.fill(this.path);
        ctx.restore();
    }
}
