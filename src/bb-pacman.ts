import { couldStartTrivia } from "typescript";
import { BbElement } from "./bb-element";

export class BbPacman extends BbElement {
    static maxMouthAngle: number = 0.2;
    static mouthAngle: number = BbPacman.maxMouthAngle;
    static mouthOpening: boolean = false;
    static mouthAngleStep: number = 0.005;

    public set goingLeft(v: boolean) {
        this.mouthSide = Number(!v);
    }

    private mouthSide = 1; // * Math.PI

    paint(ctx: CanvasRenderingContext2D) {
        ctx.save();

        const radius = this.bb.w * 0.5;

        const backAngle = Number(!this.mouthSide);

        ctx.beginPath();
        ctx.arc(this.bb.x + radius,
            this.bb.y + radius,
            radius,
            (this.mouthSide - BbPacman.mouthAngle) * Math.PI,
            (backAngle - BbPacman.mouthAngle) * Math.PI,
            false);
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.bb.x + radius,
            this.bb.y + radius,
            radius,
            (backAngle + BbPacman.mouthAngle) * Math.PI,
            (this.mouthSide + BbPacman.mouthAngle) * Math.PI,
            false);
        ctx.fill();
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
}
