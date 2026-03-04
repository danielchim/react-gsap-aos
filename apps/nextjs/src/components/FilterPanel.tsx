import { useState } from "react";

import cn from "@/utils/cn";

import AnimationFilter from "./AnimationFilter";
import EasingFilter from "./EasingFilter";
import AnchorPlacement from "./AnchorPlacement";
import OtherFilter from "./OtherFilter";

type FilterType = "animation" | "easing" | "anchor-placement";

interface Tab {
  value: string;
  label: string;
}

const tabs: Tab[] = [
  { value: "animation", label: "動畫類型" },
  { value: "easing", label: "動畫曲線" },
  { value: "anchor-placement", label: "動畫錨點" },
  { value: "other", label: "其他" },
] satisfies readonly Tab[];

interface FilterPanelProps {
  filter?: FilterType[];
}

export default function FilterPanel({ filter }: FilterPanelProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const _tabs = tabs.filter((item) => {
    if (item.value === "other") {
      return true;
    }

    if (Array.isArray(filter)) {
      if (filter.length > 0) {
        return filter.includes(item.value as FilterType);
      }
      return false;
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
      case "anchor-placement":
        return <AnchorPlacement />;
      case "other":
        return <OtherFilter />;
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
