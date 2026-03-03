import { useState } from "react";
import { useAtom } from "jotai";
import { type Easing } from "react-gsap-aos";
import { easings } from "react-gsap-aos/constants";

import { easingAtom } from "@/jotai/animation";

const categories = Array.from(
  new Set(easings.map((item) => item.split(".")[0])),
);

export default function EasingFilter() {
  const [easing, setEasing] = useAtom(easingAtom);
  const [category, setCategory] = useState(categories[0]);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">動畫曲線篩選</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <select
          className="select w-full"
          value={category}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setCategory(nextValue);
            setEasing(
              easings.find((item) => item.startsWith(nextValue)) || easings[0],
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
          disabled={easing === "none"}
          value={easing}
          onChange={(event) => {
            setEasing(event.currentTarget.value as Easing);
          }}
        >
          {easings
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
