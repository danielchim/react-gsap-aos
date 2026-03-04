"use client";

import { useAtomValue } from "jotai";

import { devToolStore, visibleAnchorAtom } from "@/jotai/animation";

const atomOptions = { store: devToolStore };

export default function AnchorPlacementMarker() {
  const visible = useAtomValue(visibleAnchorAtom, atomOptions);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col">
      <div className="bg-primary/50 top-0 h-px w-dvw self-center" />
      <div className="bg-primary/10 grow" />
      <div className="bg-secondary/50 bottom-0 h-px w-dvw self-center" />
    </div>
  );
}
