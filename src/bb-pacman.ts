import { couldStartTrivia } from "typescript";
import { BbElement } from "./bb-element";
import { bound } from "./utils/bb-math";

export class BbPacman extends BbElement {
    // Static so they are synchronized.
    static maxMouthAngle: number = 0.2; // * Math.PI
    static mouthAngle: number = BbPacman.maxMouthAngle;
    static mouthOpening: boolean = false;
    static mouthAngleStep: number = 0.005; // * Math.PI

    public mouthSide = 0; // * Math.PI

    private path: Path2D = new Path2D();

    paint(ctx: CanvasRenderingContext2D) {
        const radius = this.bb.h * 0.5;
        ctx.save();
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fill(this.path);
        ctx.stroke(this.path);

        ctx.beginPath();
        ctx.arc(this.bb.x + radius, this.bb.y + radius * 0.5, radius * 0.1, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fill();

        ctx.restore();
    }

    updatePath(): void {
        this.path = new Path2D();
        const radius = this.bb.w * 0.5;

        // Needed to prevent flickering
        const angle = bound(BbPacman.mouthAngle, 0.001, BbPacman.maxMouthAngle);

        this.path.moveTo(this.bb.x + radius, this.bb.y + radius);
        this.path.arc(this.bb.x + radius,
            this.bb.y + radius,
            radius,
            (this.mouthSide + angle) * Math.PI,
            (this.mouthSide - angle) * Math.PI);
        this.path.closePath();
    }

    static async updateMouthAngle() {
        if (BbPacman.mouthAngle >= BbPacman.maxMouthAngle) BbPacman.mouthOpening = false;
        else if (BbPacman.mouthAngle <= 0) BbPacman.mouthOpening = true;

        if (BbPacman.mouthOpening) BbPacman.mouthAngle += BbPacman.mouthAngleStep;
        else BbPacman.mouthAngle -= BbPacman.mouthAngleStep;

    }

    public isPointInPacman(x: number, y: number, ctx: CanvasRenderingContext2D) {
        return ctx.isPointInPath(this.path, x, y);
    }
}
