"use client";

import { Provider, useAtomValue } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";
import AllAnimations from "./AllAnimations";
import SingleAnimation from "./SingleAnimation";
import Typography from "./Typography";

export default function Panel() {
  const index = useAtomValue(tabIndexAtom);
  switch (index) {
    case 0:
      return (
        <Provider>
          <AllAnimations />
        </Provider>
      );
    case 1:
      return (
        <Provider>
          <SingleAnimation />
        </Provider>
      );
    case 2:
      return (
        <Provider>
          <Typography />
        </Provider>
      );
    default:
      break;
  }
}
