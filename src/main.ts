import { BbGame } from "./bb-game";
import { BbBluetooth } from "./bb-bluetooth";

const bluetoothButton = document.getElementById("bluetoothButton");
bluetoothButton?.addEventListener("click", (ev: Event) => {
    BbBluetooth.connect().then(() => {
        const htmlExceptGame = document.getElementById("htmlExceptGame");
        htmlExceptGame?.style.setProperty("visibility", "hidden");
        const game = BbGame.getGame();
        game.start();
    }).catch((err) => {
        console.error("An error ocurred:", err);
    })
})
