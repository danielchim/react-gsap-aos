"use client";

import { useAtomValue } from "jotai";
import { toAOSProps } from "react-gsap-aos";

import { animationAtom, easingAtom } from "@/jotai/animation";

import FilterPanel from "@/components/FilterPanel";
import ColorBox from "@/components/ColorBox";

const list = Array(20).fill(null);

export default function SingleAnimation() {
  return (
    <section className="grid gap-4">
      <FilterPanel />
      <Items />
    </section>
  );
}

function Items() {
  const easing = useAtomValue(easingAtom);
  const animation = useAtomValue(animationAtom);

  return (
    <ul className="flex flex-col gap-[inherit] overflow-hidden">
      {list.map((_, index) => (
        <li key={index} data-aos-container>
          <ColorBox index={index} {...toAOSProps({ animation, easing })}>
            <span>{animation.replace(/\-/g, " ")}</span>
          </ColorBox>
        </li>
      ))}
    </ul>
  );
}
