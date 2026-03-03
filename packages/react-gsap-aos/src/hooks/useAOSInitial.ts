import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import createAnimation from "@/animation/createAnimation";
import type { AnimationOptions, AOSAttributeKey } from "@/types";

gsap.registerPlugin(useGSAP);

/** AOS 屬性 */
const AOS_ATTRIBUTE_KEYS: (AOSAttributeKey | "data-aos")[] = [
  "data-aos",
  "data-aos-offset",
  "data-aos-delay",
  "data-aos-duration",
  "data-aos-easing",
  "data-aos-mirror",
  "data-aos-once",
  "data-aos-anchor-placement",
];

/** AOS 選擇器 */
const AOS_SELECTORS = "[data-aos]";

/**
 * 初始化 AOS 動畫
 * 
 * @example
 * ```tsx
  "use client";

  import {useAOSInitial} from '@/aos';
 
  export default function Demo() {
    const {containerRef} = useAOSInitial<HTMLDivElement>()
    return (
      <div ref={containerRef} className="overflow-hidden">
        <div data-aos-container>
          <div data-aos="fade-up">Hello AOS</div>
        </div>
      </div>
    )
  }
 * ```
 */
export default function useAOSInitial<E extends HTMLElement = HTMLElement>(
  options?: Partial<AnimationOptions>,
) {
  const containerRef = useRef<E | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  /** 記錄每個元素對應的動畫實例 */
  const animationsWeakMap = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
    new WeakMap(),
  );
  const optionsRef = useRef(options);

  // 使用靜態寫入，下次新增動畫才會套用覆蓋預設值
  useLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useGSAP(
    (_, contextSafe) => {
      if (!containerRef.current || !contextSafe) return;

      /** 移除動畫 */
      const removeAnimation = (element: HTMLElement) => {
        const animation = animationsWeakMap.current.get(element);
        if (!animation) return;

        animation.kill();
        animationsWeakMap.current.delete(element);
      };

      /** 新增動畫 */
      const addAnimation = (element: HTMLElement) => {
        const newAnimation = createAnimation(element, optionsRef.current);
        if (!newAnimation) return;

        animationsWeakMap.current.set(element, newAnimation);
      };

      /** 更新動畫 */
      const updateAnimation = (element: HTMLElement) => {
        const prevAnimation = animationsWeakMap.current.get(element);
        if (prevAnimation) {
          prevAnimation.kill();
          animationsWeakMap.current.delete(element);
          // TODO 回朔動畫，目前這樣寫才會功能正常，需要找更好的方案
          gsap.set(element, prevAnimation.vars).kill();
        }

        addAnimation(element);
      };

      /** 監聽元素變化 */
      const handleMutation: MutationCallback = contextSafe((mutations) => {
        const removedElements = new Set<HTMLElement>();
        const addedElements = new Set<HTMLElement>();
        const updatedElements = new Set<HTMLElement>();

        for (const mutation of mutations) {
          if (mutation.type === "attributes") {
            if (mutation.target instanceof HTMLElement) {
              updatedElements.add(mutation.target);
            }
          } else if (mutation.type === "childList") {
            collectElements(mutation.addedNodes, addedElements);
            collectElements(mutation.removedNodes, removedElements);
          }
        }

        // 移除優先於新增，避免重複初始化
        removedElements.forEach(removeAnimation);
        addedElements.forEach(addAnimation);
        updatedElements.forEach(updateAnimation);
      });

      // 初始化
      for (const element of gsap.utils.toArray<HTMLElement>(
        AOS_SELECTORS,
        containerRef.current,
      )) {
        addAnimation(element);
      }

      observerRef.current = new MutationObserver(handleMutation);
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_ATTRIBUTE_KEYS,
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return { containerRef };
}

/** 搜尋 [data-aos] 變動元素 */
function collectElements(nodes: NodeList, result: Set<HTMLElement>) {
  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.matches(AOS_SELECTORS)) result.add(node);
    node
      .querySelectorAll<HTMLElement>(AOS_SELECTORS)
      .forEach((el) => result.add(el));
  }
}
