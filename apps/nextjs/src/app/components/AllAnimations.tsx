import { useState } from "react";
import { toAOSProps } from "react-gsap-aos";
import { animations, easings } from "react-gsap-aos/constants";

import FilterPanel from "@/components/FilterPanel";
import ColorBox from "@/components/ColorBox";

export default function AllAnimations() {
  const [easing, setEasing] = useState(easings[0]);

  return (
    <section className="grid gap-[inherit]">
      <FilterPanel filter={["easing"]} easing={easing} setEasing={setEasing} />
      <ul className="flex flex-col gap-4 overflow-hidden">
        {animations.map((item, index) => (
          <li key={item} data-aos-container>
            <ColorBox
              index={index}
              {...toAOSProps({ animation: item, easing })}
            >
              <span>{item.replace(/\-/g, " ")}</span>
            </ColorBox>
          </li>
        ))}
      </ul>
    </section>
  );
}
