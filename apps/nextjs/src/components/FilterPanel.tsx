import { useState } from "react";

import cn from "@/utils/cn";

import AnimationFilter from "./AnimationFilter";
import EasingFilter from "./EasingFilter";

type FilterType = "animation" | "easing";

interface Tab {
  value: FilterType;
  label: string;
}

const tabs: Tab[] = [
  {
    value: "animation",
    label: "動畫類型",
  },
  {
    value: "easing",
    label: "動畫曲線",
  },
] satisfies readonly Tab[];

interface FilterPanelProps {
  filter?: FilterType[];
}

export default function FilterPanel({ filter }: FilterPanelProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const _tabs = tabs.filter((item) => {
    if (Array.isArray(filter) && filter.length > 0) {
      return filter.includes(item.value);
    }
    return true;
  });

  function renderTab(item: Tab, index: number) {
    return (
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
    );
  }

  function renderPanel() {
    switch (_tabs[tabIndex].value) {
      case "animation":
        return <AnimationFilter />;
      case "easing":
        return <EasingFilter />;
      default:
        break;
    }
  }

  return (
    <div className="grid gap-2">
      <div role="tablist" className="tabs tabs-border">
        {_tabs.map(renderTab)}
      </div>
      {renderPanel()}
    </div>
  );
}
