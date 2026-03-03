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
  const elementAnimations = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
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
        const animation = elementAnimations.current.get(element);
        if (!animation) return;

        animation.kill();
        elementAnimations.current.delete(element);
      };

      /** 新增動畫 */
      const addAnimation = (element: HTMLElement) => {
        const newAnimation = createAnimation(element, optionsRef.current);
        if (!newAnimation) return;

        elementAnimations.current.set(element, newAnimation);
      };

      /** 更新動畫 */
      const updateAnimation = (element: HTMLElement) => {
        const prevAnimation = elementAnimations.current.get(element);
        if (prevAnimation) {
          prevAnimation.kill();
          elementAnimations.current.delete(element);
          // 將動畫回到原始狀態避免錯誤
          gsap.set(element, prevAnimation.vars).kill();
        }

        addAnimation(element);
      };

      /** 監聽元素變化 */
      const handleMutation: MutationCallback = contextSafe((mutations) => {
        const addedElements: HTMLElement[] = [];
        const removedElements: HTMLElement[] = [];
        const updatedElements: HTMLElement[] = [];

        for (const mutation of mutations) {
          switch (mutation.type) {
            case "attributes": {
              if (!(mutation.target instanceof HTMLElement)) continue;
              const element = mutation.target;
              updatedElements.push(element);
              break;
            }
            case "childList": {
              addedElements.push(...collectElements(mutation.addedNodes));
              removedElements.push(...collectElements(mutation.removedNodes));
              break;
            }
            default:
              break;
          }
        }

        for (const element of removedElements) {
          removeAnimation(element);
        }

        for (const element of addedElements) {
          addAnimation(element);
        }

        for (const element of updatedElements) {
          updateAnimation(element);
        }
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
function collectElements(nodes: NodeList) {
  const elements: HTMLElement[] = [];

  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.matches(AOS_SELECTORS)) elements.push(node);
    elements.push(...node.querySelectorAll<HTMLElement>(AOS_SELECTORS));
  }

  return elements;
}
