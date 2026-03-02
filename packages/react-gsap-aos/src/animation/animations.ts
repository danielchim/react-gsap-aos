import gsap from "gsap";

import type { AnchorPlacement, AnimationOptions } from "@/types";

import definitions, {
  AnimationDefinitions,
  AnimationPreset,
} from "./definitions";
import mergeOptions from "./utils/mergeOptions";

export type AnimationFunction = (
  element: Element,
  contextSafe?: gsap.ContextSafeFunc,
  options?: Partial<AnimationOptions>,
) => gsap.core.Tween;

/** 計算 ScrollTrigger 的 start */
function scrollTriggerStart(
  anchorPlacement: AnchorPlacement,
  offset: number,
): string {
  const [v1, v2] = anchorPlacement.split("-");
  const anchor = `${v1} ${v2}`;

  if (offset === 0 || Number.isNaN(offset)) return anchor;

  const fix = `${offset > 0 ? "-" : "+"}=${Math.abs(offset)}`;
  return `${anchor}${fix}`;
}

/** 建立 ScrollTrigger 動畫 */
function createScrollTriggerTween(
  element: HTMLElement,
  preset: AnimationPreset,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  options?: Partial<AnimationOptions>,
) {
  const { offset, delay, duration, easing, once, mirror, anchorPlacement } =
    mergeOptions(options);
  /** 上層基準容器 */
  const container = element.parentElement?.hasAttribute("data-aos-container")
    ? element.parentElement
    : null;

  return gsap.fromTo(
    element,
    {
      ...preset.from,
      ...fromVars,
    },
    {
      ...preset.to,
      ...toVars,
      scrollTrigger: {
        // markers: true,
        trigger: container || element,
        toggleActions: mirror
          ? "play reverse play reverse"
          : "play none none reverse",
        once,
        start: scrollTriggerStart(anchorPlacement, offset),
      },
      ease: easing,
      duration: duration / 1000,
      delay: delay / 1000,
    },
  );
}

/** 建立動畫物件組 */
function createAnimationMap<T extends Record<string, AnimationDefinitions>>(
  definitions: T,
): { [K in keyof T]: AnimationFunction } {
  const result = {} as Record<keyof T, AnimationFunction>;
  const keys = Object.keys(definitions) as Array<keyof T>;

  for (const key of keys) {
    const { preset, from, to } = definitions[key];

    result[key] = (element, contextSafe, options) => {
      return (
        contextSafe
          ? contextSafe(createScrollTriggerTween)
          : createScrollTriggerTween
      )(element, preset, from, to, options);
    };
  }

  return result;
}

const animations = createAnimationMap(definitions);

export default animations;
