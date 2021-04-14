import { BbBluetooth } from "./bb-bluetooth";
import { BbGame } from "./bb-game";
import { BbMouse } from "./bb-mouse";
import { BbPacman } from "./bb-pacman";

export class BbPlayer extends BbPacman {
    constructor(game: BbGame) {
        super();

        if (!game) {
            throw new Error("This player is not part of a game.")
        }
        else {
            this.bb.width = this.bb.height = game.bb.height * 0.3;

            this.bb.y = (game.bb.h - this.bb.h) * 0.5;
            this.bb.x = (game.bb.w - this.bb.w) * 0.15;
        }
    }

    move(game: BbGame) {
        // No Bluetooth
        if (BbBluetooth.data == -1) {
            // lerp? (linear interpolation)...
            // this.bb.y = (scene.mouseY - this.bb.y) * 0.9 + this.bb.y;

            // or teleportation?
            this.bb.y = BbMouse.mouseY - this.bb.h * 0.5;
        }
        else {
            this.bb.y = (game.bb.h - this.bb.h) * BbBluetooth.data / 8000;
        }
    }
}
