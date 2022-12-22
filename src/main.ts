import { BbGame } from "./bb-game";
import { BbPlayer } from "./bb-player";
import { BbBluetooth } from "./bb-bluetooth";

function startGame() {
    const maxWeightInput = document.getElementById("maxWeight") as HTMLInputElement;
    BbPlayer.setMaxWeight(Number(maxWeightInput.value));
    maxWeightInput.addEventListener("change", (ev: any) => {
        const v = ev?.target?.value
        if (v) BbPlayer.setMaxWeight(Number(v));
    });
    const htmlExceptGame = document.getElementById("htmlExceptGame");
    htmlExceptGame?.style.setProperty("display", "none");
    const game = BbGame.getGame();
    game.start();
}

if (!navigator.bluetooth) {
    startGame();
}

const bluetoothButton = document.getElementById("bluetoothButton");
bluetoothButton?.addEventListener("click", (ev: Event) => {
    BbBluetooth.connect().then(() => {
        startGame();
    }).catch((err: Error) => {
        // User cancelled the request device chooser
        if (err.name === "NotFoundError") {
            startGame();
            return;
        }
        console.error("An error ocurred:", err);
    })
})
