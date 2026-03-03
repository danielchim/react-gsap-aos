import { useAtomValue } from "jotai";
import { toAOSProps } from "react-gsap-aos";
import { animations } from "react-gsap-aos/constants";

import { easingAtom } from "@/jotai/animation";

import FilterPanel from "@/components/FilterPanel";
import ColorBox from "@/components/ColorBox";

export default function AllAnimations() {
  return (
    <section className="grid gap-4">
      <FilterPanel filter={["easing"]} />
      <Items />
    </section>
  );
}

function Items() {
  const easing = useAtomValue(easingAtom);
  return (
    <ul className="flex flex-col gap-[inherit] overflow-hidden">
      {animations.map((item, index) => (
        <li key={item} data-aos-container>
          <ColorBox index={index} {...toAOSProps({ animation: item, easing })}>
            <span>{item.replace(/\-/g, " ")}</span>
          </ColorBox>
        </li>
      ))}
    </ul>
  );
}
