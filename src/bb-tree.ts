import { BbElement } from "./bb-element";
import { BbGame } from "./bb-game";

export class BbTree extends BbElement {

    constructor(game: BbGame, aleatoric: boolean = false) {
        super();
        this.bb.x = aleatoric ? Math.random() * game.bb.w : game.bb.w;
        this.bb.y = Math.random() * game.bb.h;
        this.bb.h = Math.max(Math.random() * game.bb.h * 0.1, 0.01);
        this.bb.w = this.bb.h * 0.4;

        // this.leavesColor = '#' + (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        // this.lineWidth = 1 + (Math.random() * BbTree.MAX_BRANCH_WIDTH);
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = "lightgrey";
        const centerX = (this.bb.x1 + this.bb.x2) * 0.5;
        const trunkW = 0.2 * this.bb.w; // half of the trunk width
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

    // spread = 0.6;
    // drawLeaves = true;
    // leavesColor: string;
    // leaveType = BbTree.SMALL_LEAVES;
    // lineWidth: number;

    // static MAX_BRANCH_WIDTH = 20;
    // static SMALL_LEAVES = 10;
    // static MEDIUM_LEAVES = 200;
    // static BIG_LEAVES = 500;
    // static THIN_LEAVES = 900;

    // /**
    //  * @member draw
    //  * tree.draw() initializes the tree structure
    //  *
    //  * @param {object} ctx      the canvas context
    //  * @param {integer} h       height of the canvas
    //  * @param {integer} w       width of the canvas
    //  * @param {float} spread    how much the tree branches are spread
    //  *                          Ranges from 0.3 - 1.
    //  * @param {boolean} leaves  draw leaves if set to true
    //  *
    //  */
    // draw(ctx: CanvasRenderingContext2D) {
    //     ctx.save();
    //     ctx.clearRect(0, 0, this.bb.h, this.bb.w);
    //     // Center the tree in the window
    //     ctx.translate(this.bb.w * 0.5, this.bb.h);
    //     // Set the leaves to a random color
    //     // Set branch thickness
    //     ctx.lineWidth = this.lineWidth;
    //     ctx.lineJoin = 'round';

    //     this.branch(ctx, 0);
    //     ctx.restore();
    // }

    // /**
    //  * @member branch
    //  * tree.branch() main tree drawing function
    //  *
    //  * @param depth the maximum depth the tree can branch,
    //  *        Keep this value near 12, larger value take longer to render.
    //  *
    //  */
    // branch(ctx: CanvasRenderingContext2D, depth: number) {
    //     if (depth < 12) {
    //         ctx.beginPath();
    //         ctx.moveTo(0,0);
    //         ctx.lineTo(0, this.bb.h * -0.1);
    //         ctx.stroke();

    //         ctx.translate(0, this.bb.h * -0.1);
    //         // Random integer from -0.1 to 0.1
    //         var randomN = (Math.random() * -0.2) + 0.1;

    //         ctx.rotate(randomN);

    //         if ((Math.random()) < this.spread) {
    //             // Draw the left branches
    //             ctx.rotate(-0.3);
    //             ctx.scale(0.7,0.7);
    //             ctx.save();
    //             this.branch(ctx, depth + 1);
    //             // Draw the right branches
    //             ctx.restore();
    //             ctx.rotate(0.6);
    //             ctx.save();
    //             this.branch(ctx, depth + 1);
    //             ctx.restore();
    //         }
    //         else {
    //             this.branch(ctx, depth);
    //         }
    //     }
    //     else {
    //         // Now that we have done drawing branches, draw the leaves
    //         if(this.drawLeaves) {
    //             var lengthFactor = 200;
    //             if(this.leaveType === BbTree.THIN_LEAVES) {
    //                 lengthFactor = 10;
    //             }
    //             ctx.fillStyle = this.leavesColor;
    //             ctx.fillRect(0, 0, this.leaveType, lengthFactor);
    //             ctx.stroke();
    //         }
    //     }
    // }
}
