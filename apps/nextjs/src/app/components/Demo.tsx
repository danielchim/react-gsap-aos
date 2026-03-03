"use client";

import { useState } from "react";
import { useAOSInitial } from "react-gsap-aos";
import { Provider } from "jotai";

import cn from "@/utils/cn";

import GithubButton from "@/components/GithubButton";
import FAB from "./FAB";
import AllAnimations from "./AllAnimations";
import SingleAnimation from "./SingleAnimation";
import Typography from "./Typography";

interface Tab {
  value: string;
  label: string;
}

const tabs: Tab[] = [
  {
    value: "all",
    label: "所有動畫",
  },
  {
    value: "single",
    label: "單一動畫",
  },
  { value: "typography", label: "文本測試" },
];

export default function Demo() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-4 py-4 *:px-4"
    >
      <div className="flex items-center gap-2">
        <div role="tablist" className="tabs tabs-box grow">
          {tabs.map((item, index) => (
            <button
              key={item.value}
              role="tab"
              type="button"
              onClick={() => {
                setTabIndex(index);
              }}
              className={cn("tab", { "tab-active": tabIndex === index })}
            >
              {item.label}
            </button>
          ))}
        </div>
        <GithubButton />
      </div>
      {renderPanel(tabIndex)}
      <FAB />
    </div>
  );
}

function renderPanel(index: number) {
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
