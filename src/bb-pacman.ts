import { couldStartTrivia } from "typescript";
import { BbElement } from "./bb-element";

export class BbPacman extends BbElement {
    // Static so they are synchronized.
    static maxMouthAngle: number = 0.2;
    static mouthAngle: number = BbPacman.maxMouthAngle;
    static mouthOpening: boolean = false;
    static mouthAngleStep: number = 0.005;

    private path1: Path2D = new Path2D;
    private path2: Path2D = new Path2D;


    public set goingLeft(v: boolean) {
        this.mouthSide = Number(!v);
    }

    private mouthSide = 1; // * Math.PI

    paint(ctx: CanvasRenderingContext2D) {
        this.path1 = new Path2D();
        this.path2 = new Path2D();
        ctx.save();

        const radius = this.bb.w * 0.5;

        const backAngle = Number(!this.mouthSide);

        ctx.fillStyle = "rgb(255, 255, 0)";
        // ctx.beginPath();
        this.path1.moveTo(this.bb.x + radius, this.bb.y + radius)
        this.path1.arc(this.bb.x + radius,
            this.bb.y + radius,
            radius,
            (this.mouthSide - BbPacman.mouthAngle) * Math.PI,
            (backAngle - BbPacman.mouthAngle) * Math.PI,
            false);
        ctx.fill(this.path1);
        // ctx.beginPath();
        this.path2.arc(this.bb.x + radius,
            this.bb.y + radius,
            radius,
            (backAngle + BbPacman.mouthAngle) * Math.PI,
            (this.mouthSide + BbPacman.mouthAngle) * Math.PI,
            false);
        ctx.fill(this.path2);
        ctx.beginPath();
        ctx.arc(this.bb.x + radius, this.bb.y + radius * 0.5, radius * 0.1, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fill();

        ctx.restore();
    }

    static async updateMouthAngle() {
        if (BbPacman.mouthAngle >= BbPacman.maxMouthAngle) {
            BbPacman.mouthOpening = false;
        }
        else if (BbPacman.mouthAngle <= 0) {
            BbPacman.mouthOpening = true;
        }

        if (BbPacman.mouthOpening) {
            BbPacman.mouthAngle += BbPacman.mouthAngleStep;
        }
        else {
            BbPacman.mouthAngle -= BbPacman.mouthAngleStep;
        }
    }

    public intersectsWithCircle(x: number, y: number, ctx: CanvasRenderingContext2D) {
        return ctx.isPointInPath(this.path1, x, y) || ctx.isPointInPath(this.path2, x, y);
    }
}
