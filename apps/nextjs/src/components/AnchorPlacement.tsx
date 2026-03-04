import { useAtom } from "jotai";
import { anchorPlacements } from "react-gsap-aos/constants";

import { anchorPlacementAtom } from "@/jotai/animation";
import TwoLevelSelect from "./TwoLevelSelect";

const categories = Array.from(
  new Set(anchorPlacements.map((item) => item.split("-")[0])),
);

export default function AnimationFilter() {
  const [anchorPlacement, setAnchorPlacement] = useAtom(anchorPlacementAtom);

  return (
    <TwoLevelSelect
      label="動畫錨點"
      categories={categories}
      enums={anchorPlacements}
      value={anchorPlacement}
      onChangeValue={setAnchorPlacement}
    />
  );
}
