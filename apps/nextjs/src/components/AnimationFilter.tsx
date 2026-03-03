import { useState } from "react";
import { useAtom } from "jotai";
import { type Animation } from "react-gsap-aos";
import { animations } from "react-gsap-aos/constants";

import { animationAtom } from "@/jotai/animation";

const categories = Array.from(
  new Set(animations.map((item) => item.split("-")[0])),
);

export default function AnimationFilter() {
  const [animation, setAnimation] = useAtom(animationAtom);
  const [category, setCategory] = useState(categories[0]);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">動畫篩選</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <select
          className="select w-full"
          value={category}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setCategory(nextValue);
            setAnimation(
              animations.find((item) => item.startsWith(nextValue)) ||
                animations[0],
            );
          }}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="select w-full"
          value={animation}
          onChange={(event) => {
            setAnimation(event.currentTarget.value as Animation);
          }}
        >
          {animations
            .filter((item) => item.startsWith(category))
            .map((item) => (
              <option key={item} value={item}>
                {item.replace(/\-/g, " ")}
              </option>
            ))}
        </select>
      </div>
    </fieldset>
  );
}
