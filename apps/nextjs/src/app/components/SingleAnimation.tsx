"use client";

import { toAOSProps } from "react-gsap-aos";

import useDynamicOptions from "./useDynamicOptions";

import ColorBox from "@/components/ColorBox";

const list = Array(20).fill(null);

export default function SingleAnimation() {
  const options = useDynamicOptions();

  return (
    <ul className="mx-auto flex w-full max-w-7xl flex-col gap-[inherit]">
      {list.map((_, index) => (
        <li key={index} data-aos-container>
          <ColorBox index={index} {...toAOSProps(options)}>
            <span>{options.animation.replace(/\-/g, " ")}</span>
          </ColorBox>
        </li>
      ))}
    </ul>
  );
}
