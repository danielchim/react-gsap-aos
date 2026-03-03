import createAnimation from "./createAnimation";

import type { AnimationOptions } from "@/types";

/** 迴圈建立動畫元素 */
export default function createAnimations<E extends HTMLElement>(
  elements: E[],
  options?: Partial<AnimationOptions>,
) {
  const result = [];

  for (const element of elements) {
    const animation = createAnimation(element, options);
    if (animation) {
      result.push(animation);
    }
  }

  return result;
}
