import { _TransitionGroup } from "./TransitionGroup";
import { slideLeft, slideRight, slideUp, slideDown, noop } from "./TransitionTypes";

export const TransitionGroup = _TransitionGroup;
export const TransitionTypes = {
  noop,
  slideLeft,
  slideRight,
  slideUp,
  slideDown
};
