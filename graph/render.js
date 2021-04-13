import { BbBluetooth } from "./bb-bluetooth.js";

/**
 * @param {number} v The latest weight value;
 */
export function dataReceived(v) {


}

export function initScene(app) {
  const yAxis = new PIXI.Graphics();
  const margins = app.renderer.view.height * 0.005;
  yAxis.moveTo(margins, margins);
  yAxis.lineTo(margins, app.renderer.view.height - 2 * margins);
  app.stage.addChild(yAxis);
}

export function render() {

}
