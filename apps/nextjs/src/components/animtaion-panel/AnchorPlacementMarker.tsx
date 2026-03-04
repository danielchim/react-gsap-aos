"use client";

import { atom, useAtomValue } from "jotai";

import {
  anchorPlacementAtom,
  devToolStore,
  visibleAnchorAtom,
} from "@/jotai/animation";
import cn from "@/utils/cn";

const atomOptions = { store: devToolStore };

const anchorAtom = atom((get) => get(anchorPlacementAtom).split("-")[0]);

export default function AnchorPlacementMarker() {
  const visible = useAtomValue(visibleAnchorAtom, atomOptions);
  const anchor = useAtomValue(anchorAtom);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
      <div className="bg-primary/50 h-px w-dvw self-center" />
      <div className="bg-primary/10 grow" />
      <div
        className={cn(
          "bg-secondary/50 absolute h-px w-dvw self-center",
          (() => {
            switch (anchor) {
              case "top":
                return "top-0";
              case "center":
                return "top-1/2 -translate-y-1/2";
              case "bottom":
                return "bottom-0";
              default:
                break;
            }
          })(),
        )}
      />
      <div className="bg-primary/50 h-px w-dvw self-center" />
    </div>
  );
}
