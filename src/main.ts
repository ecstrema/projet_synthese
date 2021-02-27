import { BbGame } from "./bb-game";
import { BbBluetooth } from "./bb-bluetooth";

function startGame() {
    const htmlExceptGame = document.getElementById("htmlExceptGame");
    htmlExceptGame?.style.setProperty("visibility", "hidden");
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
    }).catch((err) => {
        console.error("An error ocurred:", err);
    })
})
