import { BoundingBox } from "bounding-boxes";
import { BbGame } from "./bb-game";

export class BbElement {
    // Paint all children
    paint(ctx: CanvasRenderingContext2D) {
        return;
    }

    move(scene: BbGame) {
        return;
    }

    bb: BoundingBox = new BoundingBox(0, 0, 0, 0);
}
