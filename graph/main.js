import { BbBluetooth } from "./bb-bluetooth.js";
import { updateGraph } from "./graph.js";


function startGame() {
    const htmlExceptGame = document.getElementById("htmlExceptGame");
    htmlExceptGame?.style.setProperty("display", "none");
    const game = document.getElementById("chart");
    game?.style.setProperty("display", "flex");
    const currentWeight = document.getElementById("current-weight");
    BbBluetooth.handleNewData = (v) => {
      currentWeight.textContent = v.toFixed(2);
      updateGraph();
    };
}

if (!navigator.bluetooth) {
  alert("This navigator does not support Bluetooth. Google Chrome is known to support it.")
}

startGame();
let last = 5000;
setInterval(() => {
  last += Math.random() * 400 - 200;
  BbBluetooth.addData(last);
}, 100)
// const bluetoothButton = document.getElementById("bluetoothButton");
// bluetoothButton?.addEventListener("click", (ev) => {
//     BbBluetooth.connect().then(() => {
//         startGame();
//     }).catch((err) => {
//         console.error("An error ocurred:", err);
//     })
// })
