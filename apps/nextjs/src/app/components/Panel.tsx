"use client";

import { Provider, useAtomValue } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";

import AllAnimations from "./AllAnimations";
import SingleAnimation from "./SingleAnimation";
import Typography from "./Typography";

import AnimationPanel from "@/components/animtaion-panel/AnimationPanel";
import OffsetMarker from "@/components/animtaion-panel/OffsetMarker";

export default function Panel() {
  const index = useAtomValue(tabIndexAtom);

  return (
    <section className="grid w-full gap-4 overflow-hidden px-4">
      {(() => {
        switch (index) {
          case 0:
            return (
              <Provider>
                <AnimationPanel
                  key={0}
                  filter={["easing", "anchor-placement"]}
                />
                <AllAnimations />
                <OffsetMarker />
              </Provider>
            );
          case 1:
            return (
              <Provider>
                <AnimationPanel key={1} />
                <SingleAnimation />
                <OffsetMarker />
              </Provider>
            );
          case 2:
            return (
              <Provider>
                <AnimationPanel
                  key={2}
                  filter={["easing", "anchor-placement"]}
                />
                <Typography />
                <OffsetMarker />
              </Provider>
            );
          default:
            break;
        }
      })()}
    </section>
  );
}
