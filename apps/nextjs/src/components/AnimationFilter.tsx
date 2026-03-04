import { useAtom } from "jotai";
import { animations } from "react-gsap-aos/constants";

import { animationAtom } from "@/jotai/animation";
import TwoLevelSelect from "./TwoLevelSelect";

const categories = Array.from(
  new Set(animations.map((item) => item.split("-")[0])),
);

export default function AnimationFilter() {
  const [animation, setAnimation] = useAtom(animationAtom);

  return (
    <TwoLevelSelect
      label="動畫類型"
      categories={categories}
      enums={animations}
      value={animation}
      onChangeValue={setAnimation}
    />
  );
}
