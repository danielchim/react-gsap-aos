"use client";

import { Provider, useAtomValue } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";

import AnchorMarker from "./AnchorMarker";
import AllAnimations from "./AllAnimations";
import SingleAnimation from "./SingleAnimation";
import Typography from "./Typography";

import FilterPanel from "@/components/FilterPanel";

export default function Panel() {
  const index = useAtomValue(tabIndexAtom);

  return (
    <section className="grid w-full gap-4 overflow-hidden px-4">
      {(() => {
        switch (index) {
          case 0:
            return (
              <Provider>
                <FilterPanel key={0} filter={["easing", "anchor-placement"]} />
                <AllAnimations />
                <AnchorMarker />
              </Provider>
            );
          case 1:
            return (
              <Provider>
                <FilterPanel key={1} />
                <SingleAnimation />
                <AnchorMarker />
              </Provider>
            );
          case 2:
            return (
              <Provider>
                <FilterPanel key={2} filter={["easing", "anchor-placement"]} />
                <Typography />
                <AnchorMarker />
              </Provider>
            );
          default:
            break;
        }
      })()}
    </section>
  );
}
