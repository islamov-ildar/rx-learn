import {fromEvent, map, pairwise, switchMap, takeUntil, tap} from "rxjs";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const cx = canvas.getContext('2d')!;

cx.lineWidth = 4;

interface Position {
  x: number;
  y: number;
};

function drawLine([prev, next]: Position[]) {
  cx.beginPath();

  cx.moveTo(prev.x, prev.y);
  cx.lineTo(next.x, next.y);

  cx.stroke();
}

const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove');
const mouseDown$ = fromEvent<MouseEvent>(canvas, 'mousedown');
const mouseUp$ = fromEvent<MouseEvent>(canvas, 'mouseup');
const mouseOut$ = fromEvent<MouseEvent>(canvas, 'mouseout');

const points$ = mouseMove$.pipe(
  map<MouseEvent, Position>(({clientX, clientY}) => {
    const {top, left} = canvas.getBoundingClientRect();
    return {
      x: clientX - left,
      y: clientY - top,
    }
  }),
  pairwise<Position>(),
  tap(val => console.log(val)),
);

mouseDown$.pipe(
  switchMap(() => points$.pipe(
    takeUntil(mouseOut$),
    takeUntil(mouseUp$),
  )),
).subscribe(drawLine);
