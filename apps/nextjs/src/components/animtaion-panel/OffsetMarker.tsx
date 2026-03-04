"use client";

import { useAtomValue } from "jotai";

import { devToolStore, offsetAtom, visibleOffsetAtom } from "@/jotai/animation";

const atomOptions = { store: devToolStore };

export default function OffsetMarker() {
  const offset = useAtomValue(offsetAtom);
  const visible = useAtomValue(visibleOffsetAtom, atomOptions);

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
      <span className="text-primary mx-2 font-semibold">動畫觸發距離</span>
    </div>
  );
}
