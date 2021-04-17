import { BbGame } from "./bb-game";
import { BbTree } from "./bb-tree";
import { BbArrayUtils } from "./utils/bb-array-utils";

export class BbBackground {
    trees: (BbTree|null)[] = [];

    constructor() {}

    treeCallback() {
        if (!BbGame.getGame().playing) {
            return;
        }

        BbArrayUtils.fillFirstEmpty(BbTree, this.trees, BbGame.getGame());
        setTimeout(this.treeCallback.bind(this), Math.max(Math.random() * 1000, 100));
    }

    reset() {
        this.trees = [];
    }

    start() {
        this.trees = [];
        for (let i = 0; i < Math.max(Math.ceil(Math.random() * 100), 50); i++) {
            this.trees.push(new BbTree(BbGame.getGame(), true));
        }
        this.treeCallback();
    }

    paint(ctx: CanvasRenderingContext2D) {
        for (const tree of this.trees) {
            if (tree) {
                tree.paint(ctx);
            }
        }
    }

    move(game: BbGame) {
        for (let index = 0; index < this.trees.length; index++) {
            const tree = this.trees[index];
            if (tree) {
                tree.bb.x -= game.bb.w * 0.001;
                if (!tree.bb.intersects(game.bb)) {
                    delete this.trees[index];
                }
            }
        }
    }
}
