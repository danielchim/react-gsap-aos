import { useAtom } from "jotai";

import {
  devToolStore,
  visibleAnchorAtom,
  visibleOffsetAtom,
} from "@/jotai/animation";
import ResetButton from "./ResetButton";

export default function DevTool() {
  return (
    <div className="flex flex-wrap gap-4">
      <ResetButton />
      <VisibleOffset />
      <VisibleAnchor />
    </div>
  );
}

const atomOptions = { store: devToolStore };

function VisibleAnchor() {
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

function VisibleOffset() {
  const [visible, setVisible] = useAtom(visibleOffsetAtom, atomOptions);

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
        顯示動畫觸發距離
      </label>
    </fieldset>
  );
}
