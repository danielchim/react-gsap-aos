import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";

import {
  commonStore,
  animationAtom,
  easingAtom,
  offsetAtom,
  durationAtom,
  delayAtom,
  onceAtom,
  mirrorAtom,
  anchorPlacementAtom,
  visibleAnchorAtom,
} from "@/jotai/animation";

export default function OtherFilter() {
  return (
    <div className="flex flex-wrap items-end gap-x-4">
      <OffsetInput />
      <OnceCheckbox />
      <MirrorCheckbox />
      <VisibleMarker />
      <ResetButton />
    </div>
  );
}

const atomOptions = { store: commonStore };

function ResetButton() {
  const setAnimationAtom = useSetAtom(animationAtom);
  const setEasing = useSetAtom(easingAtom);
  const setAnchorPlacement = useSetAtom(anchorPlacementAtom);
  const setOffset = useSetAtom(offsetAtom);
  const setDuration = useSetAtom(durationAtom);
  const setDelay = useSetAtom(delayAtom);
  const setOnce = useSetAtom(onceAtom);
  const setMirror = useSetAtom(mirrorAtom);
  // 客製化狀態
  const setVisibleAnchorAtom = useSetAtom(visibleAnchorAtom, atomOptions);

  function onClick() {
    setAnimationAtom(RESET);
    setEasing(RESET);
    setAnchorPlacement(RESET);
    setOffset(RESET);
    setDuration(RESET);
    setDelay(RESET);
    setOnce(RESET);
    setMirror(RESET);
    //
    setVisibleAnchorAtom(RESET);
  }

  return (
    <fieldset className="fieldset">
      <button type="button" onClick={onClick} className="btn btn-error">
        重置
      </button>
    </fieldset>
  );
}

function OffsetInput() {
  const [offset, setOffset] = useAtom(offsetAtom);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(offset.toString(10));
  }, [offset]);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">提前觸發動畫的距離</legend>
      <div className="join">
        <label className="input join-item">
          <input
            type="number"
            inputMode="numeric"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            setOffset(parseInt(inputValue, 10));
          }}
          className="join-item btn"
        >
          套用
        </button>
      </div>
    </fieldset>
  );
}

function OnceCheckbox() {
  const [once, setOnce] = useAtom(onceAtom);

  return (
    <fieldset className="fieldset">
      <label className="label h-10">
        <input
          type="checkbox"
          className="checkbox"
          checked={once}
          onChange={(event) => {
            setOnce(event.currentTarget.checked);
          }}
        />
        是否只執行一次
      </label>
    </fieldset>
  );
}

function MirrorCheckbox() {
  const [mirror, setMirror] = useAtom(mirrorAtom);

  return (
    <fieldset className="fieldset">
      <label className="label h-10">
        <input
          type="checkbox"
          className="checkbox"
          checked={mirror}
          onChange={(event) => {
            setMirror(event.currentTarget.checked);
          }}
        />
        是否於離開時反向播放
      </label>
    </fieldset>
  );
}

function VisibleMarker() {
  const [visible, setVisible] = useAtom(visibleAnchorAtom, atomOptions);

  return (
    <fieldset className="fieldset">
      <label className="label h-10">
        <input
          type="checkbox"
          className="checkbox"
          checked={visible}
          onChange={(event) => {
            setVisible(event.currentTarget.checked);
          }}
        />
        顯示動畫觸發點
      </label>
    </fieldset>
  );
}
