import { spring } from "react-motion";

export const noop = {
  style: { x: spring(0) },
  defaultStyle: { x: 0 },
  enter: { x: 0 },
  leave: { x: spring(0) },
  transform: x => `translate3d(${x}vw, 0, 0)`
};

export const slideLeft = {
  style: { x: spring(0) },
  defaultStyle: { x: 100 },
  enter: { x: 100 },
  leave: { x: spring(-100) },
  transform: x => `translate3d(${x}vw, 0, 0)`
};

export const slideRight = {
  style: { x: spring(0) },
  defaultStyle: { x: -100 },
  enter: { x: -100 },
  leave: { x: spring(100) },
  transform: x => `translate3d(${x}vw, 0, 0)`
};

export const slideDown = {
  style: { x: spring(0) },
  defaultStyle: { x: -100 },
  enter: { x: -100 },
  leave: { x: spring(100) },
  transform: x => `translate3d(0, ${x}vh, 0)`
};

export const slideUp = {
  style: { x: spring(0) },
  defaultStyle: { x: 100 },
  enter: { x: 100 },
  leave: { x: spring(-100) },
  transform: x => `translate3d(0, ${x}vh, 0)`
};
