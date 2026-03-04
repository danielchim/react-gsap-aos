"use client";

import { useAtomValue } from "jotai";

import { commonStore, offsetAtom, visibleAnchorAtom } from "@/jotai/animation";

export default function AnchorMarker() {
  const offset = useAtomValue(offsetAtom);
  const visible = useAtomValue(visibleAnchorAtom, { store: commonStore });

  if (!visible) {
    return null;
  }

  return (
    <div
      className="bg-primary fixed bottom-0 left-0 flex h-px flex-col justify-end"
      style={{
        transform: `translateY(${-offset}px)`,
      }}
    >
      <span className="text-primary mx-2 font-semibold">動畫觸發點</span>
    </div>
  );
}
