import { fromEvent } from "rxjs";
import {
  map,
  takeUntil,
  pairwise,
  withLatestFrom,
  startWith,
  switchMap
} from "rxjs/operators";

const canvas = document.querySelector("canvas");
const range = document.querySelector("#range");
const color = document.querySelector("#color");

const ctx = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
const scale = window.devicePixelRatio;

canvas.width = rect.width * scale;
canvas.height = rect.height * scale;
ctx.scale(scale, scale);

const lineWidth$ = fromEvent(range, "input").pipe(
  map(e => e.target.value),
  startWith(range.value)
);

const strokeStyle$ = fromEvent(color, "input").pipe(
  map(e => e.target.value),
  startWith(color.value)
);

fromEvent(canvas, "mousedown")
  .pipe(
    withLatestFrom(lineWidth$, strokeStyle$, (_, lineWidth, strokeStyle) => ({
      lineWidth,
      strokeStyle
    })),
    switchMap(options =>
      fromEvent(canvas, "mousemove").pipe(
        map(e => ({ x: e.offsetX, y: e.offsetY, options })),
        pairwise(),
        takeUntil(fromEvent(canvas, "mouseup")),
        takeUntil(fromEvent(canvas, "mouseout"))
      )
    )
  )
  .subscribe(([from, to]) => {
    const { lineWidth, strokeStyle } = from.options;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  });
