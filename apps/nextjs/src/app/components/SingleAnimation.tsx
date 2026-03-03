import { useState } from "react";
import { toAOSProps } from "react-gsap-aos";
import { animations, easings } from "react-gsap-aos/constants";

import FilterPanel from "@/components/FilterPanel";
import ColorBox from "@/components/ColorBox";

const list = Array(20).fill(null);

export default function SingleAnimation() {
  const [animation, setAnimation] = useState(animations[0]);
  const [easing, setEasing] = useState(easings[0]);

  return (
    <section className="grid gap-[inherit]">
      <FilterPanel
        animation={animation}
        setAnimation={setAnimation}
        easing={easing}
        setEasing={setEasing}
      />
      <ul className="flex flex-col gap-4 overflow-hidden">
        {list.map((_, index) => (
          <li key={index} data-aos-container>
            <ColorBox index={index} {...toAOSProps({ animation, easing })}>
              <span>{animation.replace(/\-/g, " ")}</span>
            </ColorBox>
          </li>
        ))}
      </ul>
    </section>
  );
}
