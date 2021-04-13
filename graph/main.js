import { BbBluetooth } from "./bb-bluetooth.js";
import { dataReceived, initScene, render } from "./render.js";

function start() {
  const htmlExceptGame = document.getElementById("htmlExceptGame");
  htmlExceptGame?.style.setProperty("display", "none");

  //Create a Pixi Application
  const app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: true,  // default: false
    resolution: window.devicePixelRatio || 1       // default: 1
  }
  );

  // const gameDiv = document.getElementById("chart");
  // if (gameDiv) {
  //   gameDiv.appendChild(app.view);
  //   gameDiv.style.display = "block";
  //   gameDiv.style.position = "absolute";
  //   app.renderer.autoResize = true;
  //   app.renderer.resize(window.innerWidth, window.innerHeight);
  // }
  // else {
  //   alert("An error ocurred. Please refresh this page.");
  // }
  // initScene(app);
  // BbBluetooth.handleNewData = dataReceived;
  document.body.appendChild(app.view);

  const container = new PIXI.Container();

  app.stage.addChild(container);

  // Create a new texture
  const axes = PIXI.Graphics();
  axes.beginFill(0xDE3249);
  axes.drawRect(50, 50, 100, 100);
  axes.endFill();
}

if (!navigator.bluetooth) {
  alert("This navigator does not support Bluetooth. Google Chrome is known to support it.")
}

start();
let last = 5000;
setInterval(() => {
  last += Math.random() * 400 - 200;
  BbBluetooth.addData(last);
}, 100);

// window.requestAnimationFrame(render);
// const bluetoothButton = document.getElementById("bluetoothButton");
// bluetoothButton?.addEventListener("click", (ev) => {
//     BbBluetooth.connect().then(() => {
//         startGame();
//     }).catch((err) => {
//         console.error("An error ocurred:", err);
//     })
// })
