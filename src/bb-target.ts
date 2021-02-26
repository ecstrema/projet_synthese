import { BbGame } from "./bb-game";
import { BbPacman } from "./bb-pacman";

export class BbTarget extends BbPacman {
    touched: boolean = false;

    versLeBas = false;

    constructor(game: BbGame) {
        super();

        this.goingLeft = true;

        if (!game) {
            throw new Error("This element is not part of a game.")
        }
        else {
            this.bb.height = this.bb.width = game.bb.height * 0.2;
            const margins = game.bb.height * 0.1;

            this.bb.y = Math.random() * (game.bb.height - this.bb.height - margins) + margins;
            this.bb.x = game.bb.w;
        }
    }

    move(game: BbGame) {
        if (this.touched) {
            if (this.versLeBas) {
                this.bb.y += game.bb.width * 0.005 * (game.speed);
            }
            else {
                this.bb.y -= game.bb.width * 0.005 * (game.speed);
            }
        }
        else {
            this.bb.x -= game.bb.width * 0.005 * (game.speed), 0;
        }
        return this;
    }
}
