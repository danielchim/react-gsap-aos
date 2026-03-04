import { useAtom } from "jotai";
import { easings } from "react-gsap-aos/constants";

import { easingAtom } from "@/jotai/animation";
import TwoLevelSelect from "@/components/form/TwoLevelSelect";

const categories = Array.from(
  new Set(easings.map((item) => item.split(".")[0])),
);

export default function EasingFilter() {
  const [easing, setEasing] = useAtom(easingAtom);

  return (
    <TwoLevelSelect
      label="動畫曲線"
      categories={categories}
      enums={easings}
      value={easing}
      onChangeValue={setEasing}
    />
  );
}
