import { BbBluetooth } from "./bb-bluetooth.js";

document.body.style.height = `${window.innerHeight}px`;

/** @type {CanvasRenderingContext2D} */
const myCanvas = document.getElementById("chart-canvas");
const originalHeight = myCanvas.height;
const originalWidth = myCanvas.width;

let updating = false;
export function updateGraph() {
  if (updating) return;
  updating = true;

  const dimensions = getObjectFitSize(
    true,
    myCanvas.clientWidth,
    myCanvas.clientHeight,
    myCanvas.width,
    myCanvas.height
  );
  const dpr = window.devicePixelRatio || 1;
  myCanvas.width = dimensions.width * dpr;
  myCanvas.height = dimensions.height * dpr;

  /** @type {CanvasRenderingContext2D} */
  let ctx = myCanvas.getContext("2d");
  let ratio = Math.min(
    myCanvas.clientWidth / originalWidth,
    myCanvas.clientHeight / originalHeight
  );
  ctx.scale(ratio * dpr, ratio * dpr);

  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.beginPath();
  ctx.moveTo(100, getHeight(ctx, BbBluetooth.data[BbBluetooth.data.length - 1]));
  const pointsToPlot = 100;
  let count = 1;
  for (let i = BbBluetooth.data.length - 2; i > BbBluetooth.data.length - 2 - pointsToPlot; i--) {
    if (typeof BbBluetooth.data[i] === "number") {
      ctx.lineTo(100 - (100 / pointsToPlot * count), getHeight(ctx, BbBluetooth.data[i]));
    }
    count++;
  }
  ctx.stroke();
  ctx.restore();

  updating = false;
}
function getHeight(ctx, weight) {
  return 100 * (weight / 10000);
}


// adapted from: https://www.npmjs.com/package/intrinsic-scale
function getObjectFitSize(
  contains /* true = contain, false = cover */,
  containerWidth,
  containerHeight,
  width,
  height
) {
  var doRatio = width / height;
  var cRatio = containerWidth / containerHeight;
  var targetWidth = 0;
  var targetHeight = 0;
  var test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2
  };
}
