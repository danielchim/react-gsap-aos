import { type AOSAnimation } from "@/aos";
import { animations } from "@/aos/constants";
import { useState } from "react";

interface AnimationFilterProps {
  value: AOSAnimation;
  onChangeValue: (next: AOSAnimation) => void;
}

const categories = Array.from(
  new Set(animations.map((item) => item.split("-")[0])),
);

export default function AnimationFilter({
  value,
  onChangeValue,
}: AnimationFilterProps) {
  const [category, setCategory] = useState(categories[0]);

  return (
    <div>
      <select
        className="select"
        value={category}
        onChange={(event) => {
          const nextValue = event.currentTarget.value;
          setCategory(event.currentTarget.value);
          onChangeValue(
            animations.find((i) => i.startsWith(nextValue)) || animations[0],
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
        className="select"
        value={value}
        onChange={(event) => {
          onChangeValue(event.currentTarget.value as AOSAnimation);
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
  );
}
