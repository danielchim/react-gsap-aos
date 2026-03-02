import { AnimationOptions } from "@/types";
import createAnimation from "./createAnimation";

/** 迴圈建立動畫元素 */
export default function createAnimations<E extends Element>(
  elements: E[],
  contextSafe?: gsap.ContextSafeFunc,
  options?: Partial<AnimationOptions>,
) {
  const result = [];

  for (const element of elements) {
    const animation = createAnimation(element, contextSafe, options);
    if (animation) {
      result.push(animation);
    }
  }

  return result;
}
